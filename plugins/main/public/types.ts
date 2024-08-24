import { AppMountParameters, CoreStart } from 'opensearch_dashboards/public';
import { ChartsPluginStart } from '../../../src/plugins/charts/public/plugin';
import { DiscoverStart } from '../../../src/plugins/discover/public';
import {
  VisualizationsSetup,
  VisualizationsStart,
} from '../../../src/plugins/visualizations/public';
import {
  DataPublicPluginSetup,
  DataPublicPluginStart,
} from '../../../src/plugins/data/public';
import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';
import { UiActionsSetup } from '../../../src/plugins/ui_actions/public';
import { SecurityOssPluginStart } from '../../../src/plugins/security_oss/public/';
import { SavedObjectsStart } from '../../../src/plugins/saved_objects/public';
import {
  TelemetryPluginStart,
  TelemetryPluginSetup,
} from '../../../src/plugins/telemetry/public';
import { Cyb3rhqCheckUpdatesPluginStart } from '../../cyb3rhq-check-updates/public';
import { Cyb3rhqCorePluginStart } from '../../cyb3rhq-core/public';
import { Cyb3rhqEnginePluginStart } from '../../cyb3rhq-engine/public';
import { DashboardStart } from '../../../src/plugins/dashboard/public';
import { Cyb3rhqFleetPluginStart } from '../../cyb3rhq-fleet/public';

export interface AppPluginStartDependencies {
  navigation: NavigationPublicPluginStart;
  data: DataPublicPluginStart;
  visualizations: VisualizationsStart;
  discover: DiscoverStart;
  charts: ChartsPluginStart;
  securityOss: SecurityOssPluginStart;
  savedObjects: SavedObjectsStart;
  telemetry: TelemetryPluginStart;
  cyb3rhqCheckUpdates: Cyb3rhqCheckUpdatesPluginStart;
  cyb3rhqCore: Cyb3rhqCorePluginStart;
  cyb3rhqEngine: Cyb3rhqEnginePluginStart;
  dashboard: DashboardStart;
  cyb3rhqFleet: Cyb3rhqFleetPluginStart;
}
export interface AppDependencies {
  core: CoreStart;
  plugins: AppPluginStartDependencies;
  params: AppMountParameters;
}

export type Cyb3rhqSetupPlugins = {
  uiActions: UiActionsSetup;
  visualizations: VisualizationsSetup;
  data: DataPublicPluginSetup;
  navigation: NavigationPublicPluginStart;
  telemetry: TelemetryPluginSetup;
};

export type Cyb3rhqStartPlugins = AppPluginStartDependencies;

export type Cyb3rhqSetup = {};
export type Cyb3rhqStart = {};
