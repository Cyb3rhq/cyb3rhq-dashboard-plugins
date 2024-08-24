import {
  PluginInitializerContext,
  CoreSetup,
  CoreStart,
  Plugin,
  Logger,
} from 'opensearch-dashboards/server';

import {
  PluginSetup,
  Cyb3rhqCheckUpdatesPluginSetup,
  Cyb3rhqCheckUpdatesPluginStart,
  AppPluginStartDependencies,
} from './types';
import { defineRoutes } from './routes';
import {
  availableUpdatesObject,
  userPreferencesObject,
} from './services/saved-object/types';
import {
  setCore,
  setCyb3rhqCore,
  setInternalSavedObjectsClient,
  setCyb3rhqCheckUpdatesServices,
} from './plugin-services';
import { ISecurityFactory } from '../../cyb3rhq-core/server/services/security-factory';

declare module 'opensearch-dashboards/server' {
  interface RequestHandlerContext {
    cyb3rhq_check_updates: {
      logger: Logger;
      security: ISecurityFactory;
    };
  }
}

export class Cyb3rhqCheckUpdatesPlugin
  implements Plugin<Cyb3rhqCheckUpdatesPluginSetup, Cyb3rhqCheckUpdatesPluginStart>
{
  private readonly logger: Logger;

  constructor(initializerContext: PluginInitializerContext) {
    this.logger = initializerContext.logger.get();
  }

  public async setup(core: CoreSetup, plugins: PluginSetup) {
    this.logger.debug('cyb3rhq_check_updates: Setup');

    setCyb3rhqCore(plugins.cyb3rhqCore);
    setCyb3rhqCheckUpdatesServices({ logger: this.logger });

    core.http.registerRouteHandlerContext('cyb3rhq_check_updates', () => {
      return {
        logger: this.logger,
        security: plugins.cyb3rhqCore.dashboardSecurity,
      };
    });

    const router = core.http.createRouter();

    // Register saved objects types
    core.savedObjects.registerType(availableUpdatesObject);
    core.savedObjects.registerType(userPreferencesObject);

    // Register server side APIs
    defineRoutes(router);

    return {};
  }

  public start(
    core: CoreStart,
    plugins: AppPluginStartDependencies,
  ): Cyb3rhqCheckUpdatesPluginStart {
    this.logger.debug('cyb3rhqCheckUpdates: Started');

    const internalSavedObjectsClient =
      core.savedObjects.createInternalRepository();
    setCore(core);

    setInternalSavedObjectsClient(internalSavedObjectsClient);

    return {};
  }

  public stop() {}
}
