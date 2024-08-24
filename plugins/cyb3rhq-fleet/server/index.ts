import { PluginInitializerContext } from '../../../src/core/server';
import { Cyb3rhqFleetPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new Cyb3rhqFleetPlugin(initializerContext);
}

export { Cyb3rhqFleetPluginSetup, Cyb3rhqFleetPluginStart } from './types';
