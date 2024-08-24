import { jobs, SchedulerJob } from './index';
import { configuredJobs } from './configured-jobs';
import cron from 'node-cron';
import { CYB3RHQ_STATISTICS_TEMPLATE_NAME } from '../../../common/constants';
import { statisticsTemplate } from '../../integration-files/statistics-template';
import { delayAsPromise } from '../../../common/utils';

const schedulerJobs = [];

/**
 * Wait until Kibana server is ready
 */
const checkPluginPlatformStatus = async function (context) {
  try {
    context.cyb3rhq.logger.debug('Waiting for platform servers to be ready...');

    await checkElasticsearchServer(context);
    await checkTemplate(context);
    return;
  } catch (error) {
    context.cyb3rhq.logger.warn(error.message || error);
    try {
      await delayAsPromise(3000);
      await checkPluginPlatformStatus(context);
    } catch (error) {}
  }
};

/**
 * Check Elasticsearch Server status and Kibana index presence
 */
const checkElasticsearchServer = async function (context) {
  context.cyb3rhq.logger.debug(
    `Checking the existence of ${context.server.config.opensearchDashboards.index} index`,
  );
  const data =
    await context.core.opensearch.client.asInternalUser.indices.exists({
      index: context.server.config.opensearchDashboards.index,
    });

  return data.body;
};

/**
 * Verify cyb3rhq-statistics template
 */
const checkTemplate = async function (context) {
  try {
    const appConfig = await context.cyb3rhq_core.configuration.get();

    const prefixTemplateName = appConfig['cron.prefix'];
    const statisticsIndicesTemplateName =
      appConfig['cron.statistics.index.name'];
    const pattern = `${prefixTemplateName}-${statisticsIndicesTemplateName}-*`;

    try {
      // Check if the template already exists
      context.cyb3rhq.logger.debug(
        `Getting the ${CYB3RHQ_STATISTICS_TEMPLATE_NAME} template`,
      );
      const currentTemplate =
        await context.core.opensearch.client.asInternalUser.indices.getTemplate(
          {
            name: CYB3RHQ_STATISTICS_TEMPLATE_NAME,
          },
        );
      // Copy already created index patterns
      statisticsTemplate.index_patterns =
        currentTemplate.body[CYB3RHQ_STATISTICS_TEMPLATE_NAME].index_patterns;
    } catch (error) {
      // Init with the default index pattern
      statisticsTemplate.index_patterns = [pattern];
    }

    // Check if the user is using a custom pattern and add it to the template if it does
    if (!statisticsTemplate.index_patterns.includes(pattern)) {
      statisticsTemplate.index_patterns.push(pattern);
    }

    // Update the statistics template
    context.cyb3rhq.logger.debug(
      `Updating the ${CYB3RHQ_STATISTICS_TEMPLATE_NAME} template`,
    );
    await context.core.opensearch.client.asInternalUser.indices.putTemplate({
      name: CYB3RHQ_STATISTICS_TEMPLATE_NAME,
      body: statisticsTemplate,
    });
    context.cyb3rhq.logger.info(
      `Updated the ${CYB3RHQ_STATISTICS_TEMPLATE_NAME} template`,
    );
  } catch (error) {
    context.cyb3rhq.logger.error(
      `Something went wrong updating the ${CYB3RHQ_STATISTICS_TEMPLATE_NAME} template ${
        error.message || error
      }`,
    );
    throw error;
  }
};

export async function jobSchedulerRun(context) {
  // Check Kibana index and if it is prepared, start the initialization of Cyb3rhq App.
  await checkPluginPlatformStatus(context);
  const jobs = await configuredJobs(context, {});
  for (const job in jobs) {
    const schedulerJob: SchedulerJob = new SchedulerJob(job, context);
    schedulerJobs.push(schedulerJob);
    const task = cron.schedule(jobs[job].interval, () => schedulerJob.run());
  }
}
