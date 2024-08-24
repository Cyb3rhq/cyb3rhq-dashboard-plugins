import { PluginInitializerContext } from 'opensearch_dashboards/server';

import { Cyb3rhqPlugin } from './plugin';

//  This exports static code and TypeScript types,
//  as well as, plugin platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new Cyb3rhqPlugin(initializerContext);
}

export { Cyb3rhqPluginSetup, Cyb3rhqPluginStart } from './types';
