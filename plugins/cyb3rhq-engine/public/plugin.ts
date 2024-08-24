import { CoreSetup, CoreStart, Plugin } from 'opensearch-dashboards/public';
import {
  AppPluginStartDependencies,
  Cyb3rhqEnginePluginSetup,
  Cyb3rhqEnginePluginStart,
} from './types';
import { setCore, setCyb3rhqCore } from './plugin-services';
import { Engine } from './components/engine';

export class Cyb3rhqEnginePlugin
  implements Plugin<Cyb3rhqEnginePluginSetup, Cyb3rhqEnginePluginStart>
{
  public setup(core: CoreSetup): Cyb3rhqEnginePluginSetup {
    return {};
  }

  public start(
    core: CoreStart,
    plugins: AppPluginStartDependencies,
  ): Cyb3rhqEnginePluginStart {
    setCore(core);
    setCyb3rhqCore(plugins.cyb3rhqCore);

    return { Engine };
  }

  public stop() {}
}
