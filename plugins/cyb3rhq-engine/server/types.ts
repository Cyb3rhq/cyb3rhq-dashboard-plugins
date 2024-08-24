import {
  Cyb3rhqCorePluginStart,
  Cyb3rhqCorePluginSetup,
} from '../../cyb3rhq-core/server';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppPluginStartDependencies {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Cyb3rhqEnginePluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Cyb3rhqEnginePluginStart {}

export type PluginSetup = {
  cyb3rhqCore: Cyb3rhqCorePluginSetup;
};

export interface AppPluginStartDependencies {
  cyb3rhqCore: Cyb3rhqCorePluginStart;
}
