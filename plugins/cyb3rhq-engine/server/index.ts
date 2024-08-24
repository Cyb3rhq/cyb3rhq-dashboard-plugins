import { PluginInitializerContext } from '../../../src/core/server';
import { Cyb3rhqEnginePlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new Cyb3rhqEnginePlugin(initializerContext);
}

export type { Cyb3rhqEnginePluginSetup, Cyb3rhqEnginePluginStart } from './types';
