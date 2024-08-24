import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from 'opensearch-dashboards/server';

import {
  PluginSetup,
  Cyb3rhqEnginePluginSetup,
  Cyb3rhqEnginePluginStart,
  AppPluginStartDependencies,
} from './types';
import { defineRoutes } from './routes';
import { setCore, setCyb3rhqCore } from './plugin-services';
import { ISecurityFactory } from '../../cyb3rhq-core/server/services/security-factory';

declare module 'opensearch-dashboards/server' {
  interface RequestHandlerContext {
    cyb3rhq_check_updates: {
      logger: Logger;
      security: ISecurityFactory;
    };
  }
}

export class Cyb3rhqEnginePlugin
  implements Plugin<Cyb3rhqEnginePluginSetup, Cyb3rhqEnginePluginStart>
{
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public async setup(core: CoreSetup, plugins: PluginSetup) {
    this.logger.debug('Setup');

    setCyb3rhqCore(plugins.cyb3rhqCore);

    core.http.registerRouteHandlerContext('cyb3rhq_engine', () => {
      return {
        logger: this.logger,
      };
    });

    const router = core.http.createRouter();

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(
    core: CoreStart,
    plugins: AppPluginStartDependencies,
  ): Cyb3rhqEnginePluginStart {
    this.logger.debug('Started');
    setCore(core);

    return {};
  }

  public stop() {}
}
