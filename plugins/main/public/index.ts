import { PluginInitializer, PluginInitializerContext } from 'opensearch_dashboards/public';
import { Cyb3rhqPlugin } from './plugin';
import { Cyb3rhqSetup, Cyb3rhqSetupPlugins, Cyb3rhqStart, Cyb3rhqStartPlugins } from './types';

export const plugin: PluginInitializer<Cyb3rhqSetup, Cyb3rhqStart, Cyb3rhqSetupPlugins, Cyb3rhqStartPlugins> = (
  initializerContext: PluginInitializerContext
) => {
  return new Cyb3rhqPlugin(initializerContext);
};

// These are your public types & static code
export { Cyb3rhqSetup, Cyb3rhqStart };
