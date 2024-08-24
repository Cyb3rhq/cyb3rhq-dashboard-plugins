import { Cyb3rhqConfig } from '../../react-services';
import { getWzConfig } from './get-config';

export function wzConfig() {
  return getWzConfig(new Cyb3rhqConfig());
}
