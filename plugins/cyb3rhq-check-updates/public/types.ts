import { Cyb3rhqCorePluginStart } from '../../cyb3rhq-core/public';
import { AvailableUpdates } from '../common/types';

export interface Cyb3rhqCheckUpdatesPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Cyb3rhqCheckUpdatesPluginStart {
  UpdatesNotification: () => JSX.Element | null;
  getAvailableUpdates: (
    queryApi: boolean,
    forceQuery: boolean,
  ) => Promise<AvailableUpdates>;
  DismissNotificationCheck: () => JSX.Element | null;
}

export interface AppPluginStartDependencies {
  cyb3rhqCore: Cyb3rhqCorePluginStart;
}
