import { Cyb3rhqEnginePlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
export function plugin() {
  return new Cyb3rhqEnginePlugin();
}
export type { Cyb3rhqEnginePluginSetup, Cyb3rhqEnginePluginStart } from './types';
