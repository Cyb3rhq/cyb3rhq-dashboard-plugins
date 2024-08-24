export const PLUGIN_ID = 'cyb3rhqCheckUpdates';
export const PLUGIN_NAME = 'cyb3rhq_check_updates';

export const SAVED_OBJECT_UPDATES = 'cyb3rhq-check-updates-available-updates';
export const SAVED_OBJECT_USER_PREFERENCES = 'cyb3rhq-check-updates-user-preferences';

export enum routes {
  checkUpdates = '/api/cyb3rhq-check-updates/updates',
  userPreferences = '/api/cyb3rhq-check-updates/user-preferences/me',
}
