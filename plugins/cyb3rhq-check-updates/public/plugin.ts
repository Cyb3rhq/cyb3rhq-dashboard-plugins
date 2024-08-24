import { CoreSetup, CoreStart, Plugin } from 'opensearch-dashboards/public';
import {
  AppPluginStartDependencies,
  Cyb3rhqCheckUpdatesPluginSetup,
  Cyb3rhqCheckUpdatesPluginStart,
} from './types';
import { UpdatesNotification } from './components/updates-notification';
import { DismissNotificationCheck } from './components/dismiss-notification-check';
import { setCore, setCyb3rhqCore } from './plugin-services';
import { getAvailableUpdates } from './services';

export class Cyb3rhqCheckUpdatesPlugin
  implements Plugin<Cyb3rhqCheckUpdatesPluginSetup, Cyb3rhqCheckUpdatesPluginStart> {
  public setup(core: CoreSetup): Cyb3rhqCheckUpdatesPluginSetup {
    return {};
  }

  public start(core: CoreStart, plugins: AppPluginStartDependencies): Cyb3rhqCheckUpdatesPluginStart {
    setCore(core);
    setCyb3rhqCore(plugins.cyb3rhqCore);

    return {
      UpdatesNotification,
      getAvailableUpdates,
      DismissNotificationCheck,
    };
  }

  public stop() {}
}
