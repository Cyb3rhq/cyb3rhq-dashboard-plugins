import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from 'opensearch-dashboards/server';

import {
  PluginSetup,
  Cyb3rhqFleetPluginSetup,
  Cyb3rhqFleetPluginStart,
  AppPluginStartDependencies,
} from './types';

import {
  setCore,
  setCyb3rhqCore,
  setInternalSavedObjectsClient,
  setCyb3rhqFleetServices,
} from './plugin-services';
import { ISecurityFactory } from '../../cyb3rhq-core/server/services/security-factory';

declare module 'opensearch-dashboards/server' {
  interface RequestHandlerContext {
    cyb3rhq_fleet: {
      logger: Logger;
      security: ISecurityFactory;
    };
  }
}

export class Cyb3rhqFleetPlugin
  implements Plugin<Cyb3rhqFleetPluginSetup, Cyb3rhqFleetPluginStart>
{
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public async setup(core: CoreSetup, plugins: PluginSetup) {
    this.logger.debug('cyb3rhq_fleet: Setup');

    setCyb3rhqCore(plugins.cyb3rhqCore);
    setCyb3rhqFleetServices({ logger: this.logger });

    core.http.registerRouteHandlerContext('cyb3rhq_fleet', () => {
      return {
        logger: this.logger,
        security: plugins.cyb3rhqCore.dashboardSecurity,
      };
    });

    return {};
  }

  public start(
    core: CoreStart,
    plugins: AppPluginStartDependencies,
  ): Cyb3rhqFleetPluginStart {
    this.logger.debug('cyb3rhqFleet: Started');

    const internalSavedObjectsClient =
      core.savedObjects.createInternalRepository();
    setCore(core);

    setInternalSavedObjectsClient(internalSavedObjectsClient);

    return {};
  }

  public stop() {}
}
