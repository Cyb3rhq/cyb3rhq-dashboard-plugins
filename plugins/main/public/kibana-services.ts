import {
  ChromeStart,
  CoreStart,
  HttpStart,
  IUiSettingsClient,
  OverlayStart,
  SavedObjectsStart,
  ScopedHistory,
  ToastsStart,
  AppMountParameters,
} from 'opensearch_dashboards/public';
import { createGetterSetter } from '../../../src/plugins/opensearch_dashboards_utils/common';
import { DataPublicPluginStart } from '../../../src/plugins/data/public';
import { VisualizationsStart } from '../../../src/plugins/visualizations/public';
import { NavigationPublicPluginStart } from '../../../src/plugins/navigation/public';
import { AppPluginStartDependencies } from './types';
import { Cyb3rhqCheckUpdatesPluginStart } from '../../cyb3rhq-check-updates/public';
import { Cyb3rhqEnginePluginStart } from '../../cyb3rhq-engine/public';
import { Cyb3rhqFleetPluginStart } from '../../cyb3rhq-fleet/public';

let angularModule: any = null;
let discoverModule: any = null;

export const [getCore, setCore] = createGetterSetter<CoreStart>('Core');
export const [getPlugins, setPlugins] =
  createGetterSetter<AppPluginStartDependencies>('Plugins');
export const [getToasts, setToasts] = createGetterSetter<ToastsStart>('Toasts');
export const [getHttp, setHttp] = createGetterSetter<HttpStart>('Http');
export const [getUiSettings, setUiSettings] =
  createGetterSetter<IUiSettingsClient>('UiSettings');
export const [getChrome, setChrome] = createGetterSetter<ChromeStart>('Chrome');
export const [getScopedHistory, setScopedHistory] =
  createGetterSetter<ScopedHistory>('ScopedHistory');
export const [getOverlays, setOverlays] =
  createGetterSetter<OverlayStart>('Overlays');
export const [getSavedObjects, setSavedObjects] =
  createGetterSetter<SavedObjectsStart>('SavedObjects');
export const [getDataPlugin, setDataPlugin] =
  createGetterSetter<DataPublicPluginStart>('DataPlugin');
export const [getVisualizationsPlugin, setVisualizationsPlugin] =
  createGetterSetter<VisualizationsStart>('VisualizationsPlugin');
export const [getNavigationPlugin, setNavigationPlugin] =
  createGetterSetter<NavigationPublicPluginStart>('NavigationPlugin');
export const [getWzMainParams, setWzMainParams] =
  createGetterSetter<NavigationPublicPluginStart>('WzMainParams');
export const [getWzCurrentAppID, setWzCurrentAppID] =
  createGetterSetter<NavigationPublicPluginStart>('WzCurrentAppID');
export const [getCyb3rhqCheckUpdatesPlugin, setCyb3rhqCheckUpdatesPlugin] =
  createGetterSetter<Cyb3rhqCheckUpdatesPluginStart>('Cyb3rhqCheckUpdatesPlugin');
export const [getCyb3rhqCorePlugin, setCyb3rhqCorePlugin] =
  createGetterSetter<Cyb3rhqCheckUpdatesPluginStart>('Cyb3rhqCorePlugin');
export const [getCyb3rhqEnginePlugin, setCyb3rhqEnginePlugin] =
  createGetterSetter<Cyb3rhqEnginePluginStart>('Cyb3rhqEnginePlugin');
export const [getHeaderActionMenuMounter, setHeaderActionMenuMounter] =
  createGetterSetter<AppMountParameters['setHeaderActionMenu']>(
    'headerActionMenuMounter',
  );
export const [getCyb3rhqFleetPlugin, setCyb3rhqFleetPlugin] =
  createGetterSetter<Cyb3rhqFleetPluginStart>('Cyb3rhqFleetPlugin');

/**
 * set bootstrapped inner angular module
 */
export function setAngularModule(module: any) {
  angularModule = module;
}

/**
 * get boostrapped inner angular module
 */
export function getAngularModule() {
  return angularModule;
}

/**
 * set bootstrapped inner dicover module
 */
export function setDiscoverModule(module: any) {
  discoverModule = module;
}

/**
 * get boostrapped inner dicover module
 */
export function getDiscoverModule() {
  return discoverModule;
}

export const [getCookies, setCookies] = createGetterSetter<any>('Cookies');
