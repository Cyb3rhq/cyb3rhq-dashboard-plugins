import { WzMisc } from '../../factories/misc';
import { Cyb3rhqConfig } from '../../react-services';
import { getWzConfig } from './get-config';
import { settingsWizard } from './settings-wizard';

export function nestedResolve(params) {
  const wzMisc = new WzMisc();
  const healthCheckStatus = sessionStorage.getItem('healthCheck');
  if (!healthCheckStatus) return;
  const cyb3rhqConfig = new Cyb3rhqConfig();
  return getWzConfig(cyb3rhqConfig).then(() =>
    settingsWizard(
      params,
      wzMisc,
      params.location && params.location.pathname.includes('/health-check'),
    ),
  );
}
