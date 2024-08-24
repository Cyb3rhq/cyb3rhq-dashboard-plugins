import { CoreSetup, CoreStart, Plugin } from 'opensearch-dashboards/public';
import {
  AppPluginStartDependencies,
  Cyb3rhqFleetPluginSetup,
  Cyb3rhqFleetPluginStart,
} from './types';
import { FleetManagement } from './components';
import { setCore, setPlugins, setCyb3rhqCore } from './plugin-services';

export class Cyb3rhqFleetPlugin
  implements Plugin<Cyb3rhqFleetPluginSetup, Cyb3rhqFleetPluginStart>
{
  public setup(core: CoreSetup): Cyb3rhqFleetPluginSetup {
    return {};
  }

  public start(
    core: CoreStart,
    plugins: AppPluginStartDependencies,
  ): Cyb3rhqFleetPluginStart {
    setCore(core);
    setPlugins(plugins);
    setCyb3rhqCore(plugins.cyb3rhqCore);

    return {
      FleetManagement,
    };
  }

  public stop() {}
}
