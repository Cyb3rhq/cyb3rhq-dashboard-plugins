import { Cyb3rhqCorePluginStart } from '../../cyb3rhq-core/public';

export interface Cyb3rhqEnginePluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Cyb3rhqEnginePluginStart {}

export interface AppPluginStartDependencies {
  cyb3rhqCore: Cyb3rhqCorePluginStart;
}
