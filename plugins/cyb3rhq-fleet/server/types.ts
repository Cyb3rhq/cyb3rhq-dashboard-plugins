import { ISecurityFactory } from '../../cyb3rhq-core/server/services/security-factory';
import { Cyb3rhqCorePluginStart } from '../../cyb3rhq-core/server';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AppPluginStartDependencies {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Cyb3rhqFleetPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Cyb3rhqFleetPluginStart {}

export type PluginSetup = {
  securityDashboards?: {}; // TODO: Add OpenSearch Dashboards Security interface
  cyb3rhqCore: { dashboardSecurity: ISecurityFactory };
};

export interface AppPluginStartDependencies {
  cyb3rhqCore: Cyb3rhqCorePluginStart;
}
