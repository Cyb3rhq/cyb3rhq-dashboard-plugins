/*
 * Cyb3rhq app - Module for agent info fetching functions
 * Copyright (C) 2015-2022 Cyb3rhq, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import cron from 'node-cron';
import { monitoringTemplate } from '../../integration-files/monitoring-template';
import { parseCron } from '../../lib/parse-cron';
import { indexDate } from '../../lib/index-date';
import {
  CYB3RHQ_MONITORING_DEFAULT_CRON_FREQ,
  CYB3RHQ_MONITORING_TEMPLATE_NAME,
} from '../../../common/constants';
import { tryCatchForIndexPermissionError } from '../tryCatchForIndexPermissionError';
import { delayAsPromise } from '../../../common/utils';

let MONITORING_ENABLED,
  MONITORING_FREQUENCY,
  MONITORING_CRON_FREQ,
  MONITORING_CREATION,
  MONITORING_INDEX_PATTERN,
  MONITORING_INDEX_PREFIX;

/**
 * Set the monitoring variables
 * @param context
 */
async function initMonitoringConfiguration(context) {
  try {
    context.cyb3rhq.logger.debug('Reading configuration');
    const appConfig = await context.cyb3rhq_core.configuration.get();
    MONITORING_ENABLED =
      (appConfig['cyb3rhq.monitoring.enabled'] &&
        appConfig['cyb3rhq.monitoring.enabled'] !== 'worker') ||
      appConfig['cyb3rhq.monitoring.enabled'];
    MONITORING_FREQUENCY = appConfig['cyb3rhq.monitoring.frequency'];
    try {
      MONITORING_CRON_FREQ = parseCron(MONITORING_FREQUENCY);
    } catch (error) {
      context.cyb3rhq.logger.warn(
        `Using default value ${CYB3RHQ_MONITORING_DEFAULT_CRON_FREQ} due to: ${
          error.message || error
        }`,
      );
      MONITORING_CRON_FREQ = CYB3RHQ_MONITORING_DEFAULT_CRON_FREQ;
    }
    MONITORING_CREATION = appConfig['cyb3rhq.monitoring.creation'];

    MONITORING_INDEX_PATTERN = appConfig['cyb3rhq.monitoring.pattern'];

    const lastCharIndexPattern =
      MONITORING_INDEX_PATTERN[MONITORING_INDEX_PATTERN.length - 1];
    if (lastCharIndexPattern !== '*') {
      MONITORING_INDEX_PATTERN += '*';
    }
    MONITORING_INDEX_PREFIX = MONITORING_INDEX_PATTERN.slice(
      0,
      MONITORING_INDEX_PATTERN.length - 1,
    );

    context.cyb3rhq.logger.debug(
      `cyb3rhq.monitoring.enabled: ${MONITORING_ENABLED}`,
    );

    context.cyb3rhq.logger.debug(
      `cyb3rhq.monitoring.frequency: ${MONITORING_FREQUENCY} (${MONITORING_CRON_FREQ})`,
    );

    context.cyb3rhq.logger.debug(
      `cyb3rhq.monitoring.creation: ${MONITORING_CREATION}`,
    );

    context.cyb3rhq.logger.debug(
      `cyb3rhq.monitoring.pattern: ${MONITORING_INDEX_PATTERN} (index prefix: ${MONITORING_INDEX_PREFIX})`,
    );
  } catch (error) {
    context.cyb3rhq.logger.error(error.message);
  }
}

/**
 * Main. First execution when installing / loading App.
 * @param context
 */
async function init(context) {
  try {
    if (MONITORING_ENABLED) {
      await checkTemplate(context);
    }
  } catch (error) {
    const errorMessage = error.message || error;
    context.cyb3rhq.logger.error(errorMessage);
  }
}

/**
 * Verify cyb3rhq-agent template
 */
async function checkTemplate(context) {
  try {
    try {
      context.cyb3rhq.logger.debug(
        `Getting the ${CYB3RHQ_MONITORING_TEMPLATE_NAME} template`,
      );
      // Check if the template already exists
      const currentTemplate =
        await context.core.opensearch.client.asInternalUser.indices.getTemplate(
          {
            name: CYB3RHQ_MONITORING_TEMPLATE_NAME,
          },
        );
      // Copy already created index patterns
      monitoringTemplate.index_patterns =
        currentTemplate.body[CYB3RHQ_MONITORING_TEMPLATE_NAME].index_patterns;
    } catch (error) {
      // Init with the default index pattern
      monitoringTemplate.index_patterns = [
        await context.cyb3rhq_core.configuration.get('cyb3rhq.monitoring.pattern'),
      ];
    }

    // Check if the user is using a custom pattern and add it to the template if it does
    if (!monitoringTemplate.index_patterns.includes(MONITORING_INDEX_PATTERN)) {
      monitoringTemplate.index_patterns.push(MONITORING_INDEX_PATTERN);
    }

    // Update the monitoring template
    context.cyb3rhq.logger.debug(
      `Updating the ${CYB3RHQ_MONITORING_TEMPLATE_NAME} template`,
    );
    await context.core.opensearch.client.asInternalUser.indices.putTemplate({
      name: CYB3RHQ_MONITORING_TEMPLATE_NAME,
      body: monitoringTemplate,
    });
    context.cyb3rhq.logger.info(
      `Updated the ${CYB3RHQ_MONITORING_TEMPLATE_NAME} template`,
    );
  } catch (error) {
    const errorMessage = `Something went wrong updating the ${CYB3RHQ_MONITORING_TEMPLATE_NAME} template ${
      error.message || error
    }`;
    context.cyb3rhq.logger.error(errorMessage);
    throw error;
  }
}

/**
 * Save agent status into elasticsearch, create index and/or insert document
 * @param {*} context
 * @param {*} data
 */
async function insertMonitoringDataElasticsearch(context, data) {
  const monitoringIndexName =
    MONITORING_INDEX_PREFIX + indexDate(MONITORING_CREATION);
  if (!MONITORING_ENABLED) {
    return;
  }
  try {
    await tryCatchForIndexPermissionError(monitoringIndexName)(async () => {
      context.cyb3rhq.logger.debug(
        `Checking the existence of ${monitoringIndexName} index`,
      );
      const exists =
        await context.core.opensearch.client.asInternalUser.indices.exists({
          index: monitoringIndexName,
        });
      if (!exists.body) {
        context.cyb3rhq.logger.debug(
          `The ${monitoringIndexName} index does not exist`,
        );
        await createIndex(context, monitoringIndexName);
      } else {
        context.cyb3rhq.logger.debug(`The ${monitoringIndexName} index exists`);
      }

      // Update the index configuration
      const appConfig = await context.cyb3rhq_core.configuration.get(
        'cyb3rhq.monitoring.shards',
        'cyb3rhq.monitoring.replicas',
      );

      const indexConfiguration = {
        settings: {
          index: {
            number_of_shards: appConfig['cyb3rhq.monitoring.shards'],
            number_of_replicas: appConfig['cyb3rhq.monitoring.replicas'],
          },
        },
      };

      // To update the index settings with this client is required close the index, update the settings and open it
      // Number of shards is not dynamic so delete that setting if it's given
      delete indexConfiguration.settings.index.number_of_shards;
      context.cyb3rhq.logger.debug(
        `Adding settings to ${monitoringIndexName} index`,
      );
      await context.core.opensearch.client.asInternalUser.indices.putSettings({
        index: monitoringIndexName,
        body: indexConfiguration,
      });

      context.cyb3rhq.logger.info(
        `Settings added to ${monitoringIndexName} index`,
      );

      // Insert data to the monitoring index
      await insertDataToIndex(context, monitoringIndexName, data);
    })();
  } catch (error) {
    context.cyb3rhq.logger.error(error.message || error);
  }
}

/**
 * Inserting one document per agent into Elastic. Bulk.
 * @param {*} context Endpoint
 * @param {String} indexName The name for the index (e.g. daily: cyb3rhq-monitoring-YYYY.MM.DD)
 * @param {*} data
 */
async function insertDataToIndex(
  context,
  indexName: string,
  data: { agents: any[]; apiHost },
) {
  const { agents, apiHost } = data;
  try {
    if (agents.length > 0) {
      context.cyb3rhq.logger.debug(
        `Bulk data to index ${indexName} for ${agents.length} agents`,
      );

      const bodyBulk = agents
        .map(agent => {
          const agentInfo = { ...agent };
          agentInfo['timestamp'] = new Date(Date.now()).toISOString();
          agentInfo.host = agent.manager;
          agentInfo.cluster = {
            name: apiHost.clusterName ? apiHost.clusterName : 'disabled',
          };
          return `{ "index":  { "_index": "${indexName}" } }\n${JSON.stringify(
            agentInfo,
          )}\n`;
        })
        .join('');

      await context.core.opensearch.client.asInternalUser.bulk({
        index: indexName,
        body: bodyBulk,
      });
      context.cyb3rhq.logger.info(
        `Bulk data to index ${indexName} for ${agents.length} agents completed`,
      );
    }
  } catch (error) {
    context.cyb3rhq.logger.error(
      `Error inserting agent data into elasticsearch. Bulk request failed due to ${
        error.message || error
      }`,
    );
  }
}

/**
 * Create the cyb3rhq-monitoring index
 * @param {*} context context
 * @param {String} indexName The name for the index (e.g. daily: cyb3rhq-monitoring-YYYY.MM.DD)
 */
async function createIndex(context, indexName: string) {
  try {
    if (!MONITORING_ENABLED) return;
    const appConfig = await context.cyb3rhq_core.configuration.get(
      'cyb3rhq.monitoring.shards',
      'cyb3rhq.monitoring.replicas',
    );

    const IndexConfiguration = {
      settings: {
        index: {
          number_of_shards: appConfig['cyb3rhq.monitoring.shards'],
          number_of_replicas: appConfig['cyb3rhq.monitoring.replicas'],
        },
      },
    };

    context.cyb3rhq.logger.debug(`Creating ${indexName} index`);

    await context.core.opensearch.client.asInternalUser.indices.create({
      index: indexName,
      body: IndexConfiguration,
    });

    context.cyb3rhq.logger.info(`${indexName} index created`);
  } catch (error) {
    context.cyb3rhq.logger.error(
      `Could not create ${indexName} index: ${error.message || error}`,
    );
  }
}

/**
 * Wait until Kibana server is ready
 */
async function checkPluginPlatformStatus(context) {
  try {
    context.cyb3rhq.logger.debug('Waiting for platform servers to be ready...');

    await checkElasticsearchServer(context);
    await init(context);
  } catch (error) {
    context.cyb3rhq.logger.error(error.message || error);
    try {
      await delayAsPromise(3000);
      await checkPluginPlatformStatus(context);
    } catch (error) {}
  }
}

/**
 * Check Elasticsearch Server status and Kibana index presence
 */
async function checkElasticsearchServer(context) {
  try {
    context.cyb3rhq.logger.debug(
      `Checking the existence of ${context.server.config.opensearchDashboards.index} index`,
    );
    const data =
      await context.core.opensearch.client.asInternalUser.indices.exists({
        index: context.server.config.opensearchDashboards.index,
      });

    return data.body;
    // TODO: check if Elasticsearch can receive requests
    // if (data) {
    //   const pluginsData = await this.server.plugins.elasticsearch.waitUntilReady();
    //   return pluginsData;
    // }
    return Promise.reject(data);
  } catch (error) {
    context.cyb3rhq.logger.error(error.message || error);
    return Promise.reject(error);
  }
}

/**
 * Task used by the cron job.
 */
async function cronTask(context) {
  try {
    const templateMonitoring =
      await context.core.opensearch.client.asInternalUser.indices.getTemplate({
        name: CYB3RHQ_MONITORING_TEMPLATE_NAME,
      });

    const apiHosts = await context.cyb3rhq_core.manageHosts.getEntries({
      excludePassword: true,
    });

    if (!apiHosts.length) {
      context.cyb3rhq.logger.warn('There are no API host entries. Skip.');
      return;
    }
    const apiHostsUnique = (apiHosts || []).filter(
      (apiHost, index, self) =>
        index ===
        self.findIndex(
          t =>
            t.user === apiHost.user &&
            t.password === apiHost.password &&
            t.url === apiHost.url &&
            t.port === apiHost.port,
        ),
    );
    for (let apiHost of apiHostsUnique) {
      try {
        const { agents, apiHost: host } = await getApiInfo(context, apiHost);
        await insertMonitoringDataElasticsearch(context, {
          agents,
          apiHost: host,
        });
      } catch (error) {}
    }
  } catch (error) {
    // Retry to call itself again if Kibana index is not ready yet
    // try {
    //   if (
    //     this.wzWrapper.buildingKibanaIndex ||
    //     ((error || {}).status === 404 &&
    //       (error || {}).displayName === 'NotFound')
    //   ) {
    //     await delayAsPromise(1000);
    //     return cronTask(context);
    //   }
    // } catch (error) {} //eslint-disable-line
    context.cyb3rhq.logger.error(error.message || error);
  }
}

/**
 * Get API and agents info
 * @param context
 * @param apiHost
 */
async function getApiInfo(context, apiHost) {
  try {
    context.cyb3rhq.logger.debug(`Getting API info for ${apiHost.id}`);
    const responseIsCluster =
      await context.cyb3rhq.api.client.asInternalUser.request(
        'GET',
        '/cluster/status',
        {},
        { apiHostID: apiHost.id },
      );
    const isCluster =
      (((responseIsCluster || {}).data || {}).data || {}).enabled === 'yes';
    if (isCluster) {
      const responseClusterInfo =
        await context.cyb3rhq.api.client.asInternalUser.request(
          'GET',
          `/cluster/local/info`,
          {},
          { apiHostID: apiHost.id },
        );
      apiHost.clusterName =
        responseClusterInfo.data.data.affected_items[0].cluster;
    }
    const agents = await fetchAllAgentsFromApiHost(context, apiHost);
    return { agents, apiHost };
  } catch (error) {
    context.cyb3rhq.logger.error(error.message || error);
    throw error;
  }
}

/**
 * Fetch all agents for the API provided
 * @param context
 * @param apiHost
 */
async function fetchAllAgentsFromApiHost(context, apiHost) {
  let agents = [];
  try {
    context.cyb3rhq.logger.debug(`Getting all agents from ApiID: ${apiHost.id}`);
    const responseAgentsCount =
      await context.cyb3rhq.api.client.asInternalUser.request(
        'GET',
        '/agents',
        {
          params: {
            offset: 0,
            limit: 1,
            q: 'id!=000',
          },
        },
        { apiHostID: apiHost.id },
      );

    const agentsCount = responseAgentsCount.data.data.total_affected_items;
    context.cyb3rhq.logger.debug(
      `ApiID: ${apiHost.id}, Agent count: ${agentsCount}`,
    );

    let payload = {
      offset: 0,
      limit: 500,
      q: 'id!=000',
    };

    while (agents.length < agentsCount && payload.offset < agentsCount) {
      try {
        /*
        TODO: Improve the performance of request with:
          - Reduce the number of requests to the Cyb3rhq API
          - Reduce (if possible) the quantity of data to index by document

        Requirements:
          - Research about the neccesary data to index.

        How to do:
          - Cyb3rhq API request:
            - select the required data to retrieve depending on is required to index (using the `select` query param)
            - increase the limit of results to retrieve (currently, the requests use the recommended value: 500).
              See the allowed values. This depends on the selected data because the response could fail if contains a lot of data
        */
        const responseAgents =
          await context.cyb3rhq.api.client.asInternalUser.request(
            'GET',
            `/agents`,
            { params: payload },
            { apiHostID: apiHost.id },
          );
        agents = [...agents, ...responseAgents.data.data.affected_items];
        payload.offset += payload.limit;
      } catch (error) {
        context.cyb3rhq.logger.error(
          `ApiID: ${apiHost.id}, Error request with offset/limit ${
            payload.offset
          }/${payload.limit}: ${error.message || error}`,
        );
      }
    }
    return agents;
  } catch (error) {
    context.cyb3rhq.logger.error(
      `ApiID: ${apiHost.id}. Error: ${error.message || error}`,
    );
    throw error;
  }
}

/**
 * Start the cron job
 */
export async function jobMonitoringRun(context) {
  context.cyb3rhq.logger.debug('Task:Monitoring initializing');
  // Init the monitoring variables
  await initMonitoringConfiguration(context);
  // Check Kibana index and if it is prepared, start the initialization of Cyb3rhq App.
  await checkPluginPlatformStatus(context);
  // // Run the cron job only it it's enabled
  if (MONITORING_ENABLED) {
    cronTask(context);
    cron.schedule(MONITORING_CRON_FREQ, () => cronTask(context));
  }
}
