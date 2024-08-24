import { PluginInitializerContext } from '../../../src/core/server';
import { Cyb3rhqCorePlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.

export function plugin(initializerContext: PluginInitializerContext) {
  return new Cyb3rhqCorePlugin(initializerContext);
}

export type { Cyb3rhqCorePluginSetup, Cyb3rhqCorePluginStart } from './types';
export type { IConfigurationEnhanced } from './services/enhance-configuration';
