import {
  CoreStart,
  ISavedObjectsRepository,
} from 'opensearch-dashboards/server';
import { createGetterSetter } from '../../../src/plugins/opensearch_dashboards_utils/common';
import { Cyb3rhqCorePluginStart } from '../../cyb3rhq-core/server';

export const [getInternalSavedObjectsClient, setInternalSavedObjectsClient] =
  createGetterSetter<ISavedObjectsRepository>('SavedObjectsRepository');
export const [getCore, setCore] = createGetterSetter<CoreStart>('Core');
export const [getCyb3rhqCore, setCyb3rhqCore] =
  createGetterSetter<Cyb3rhqCorePluginStart>('Cyb3rhqCore');
export const [getCyb3rhqCheckUpdatesServices, setCyb3rhqCheckUpdatesServices] =
  createGetterSetter<any>('Cyb3rhqCheckUpdatesServices');
