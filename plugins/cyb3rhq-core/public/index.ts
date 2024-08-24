import { Cyb3rhqCorePlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
export function plugin() {
  return new Cyb3rhqCorePlugin();
}
export { Cyb3rhqCorePluginSetup, Cyb3rhqCorePluginStart } from './types';
