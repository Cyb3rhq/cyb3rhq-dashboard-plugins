import { Cyb3rhqCheckUpdatesPlugin } from './plugin';

// This exports static code and TypeScript types,
// as well as, OpenSearch Dashboards Platform `plugin()` initializer.
export function plugin() {
  return new Cyb3rhqCheckUpdatesPlugin();
}
export { Cyb3rhqCheckUpdatesPluginSetup, Cyb3rhqCheckUpdatesPluginStart } from './types';
