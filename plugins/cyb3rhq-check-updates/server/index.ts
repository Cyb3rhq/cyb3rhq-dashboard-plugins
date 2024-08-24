import { PluginInitializerContext } from '../../../src/core/server';
import { Cyb3rhqCheckUpdatesPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new Cyb3rhqCheckUpdatesPlugin(initializerContext);
}

export { Cyb3rhqCheckUpdatesPluginSetup, Cyb3rhqCheckUpdatesPluginStart } from './types';
