import { Cyb3rhqCorePluginStart } from '../../cyb3rhq-core/public';
import { FleetManagementProps } from './components/fleet-management';
import { DashboardStart } from '../../../src/plugins/dashboard/public';

export interface Cyb3rhqFleetPluginSetup {}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Cyb3rhqFleetPluginStart {
  FleetManagement: (props: FleetManagementProps) => JSX.Element;
}

export interface AppPluginStartDependencies {
  cyb3rhqCore: Cyb3rhqCorePluginStart;
  dashboard: DashboardStart;
}
