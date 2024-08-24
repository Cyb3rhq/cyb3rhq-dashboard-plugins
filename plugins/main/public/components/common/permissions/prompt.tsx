/*
 * Cyb3rhq app - Prompt component with the user required permissions and/or roles
 * Copyright (C) 2015-2022 Cyb3rhq, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React, { Fragment } from 'react';
import { EuiEmptyPrompt, EuiSpacer } from '@elastic/eui';
import { TUserPermissions, TUserIsAdministrator } from '../permissions/element';
import { WzPermissionsFormatted } from './format';
import { withErrorBoundary } from '../hocs/error-boundary/with-error-boundary';

interface IEmptyPromptNoPermissions {
  permissions?: TUserPermissions;
  administrator?: TUserIsAdministrator;
  actions?: React.ReactNode;
}
export const WzEmptyPromptNoPermissions = withErrorBoundary(
  ({ permissions, administrator, actions }: IEmptyPromptNoPermissions) => {
    return (
      <EuiEmptyPrompt
        iconType='securityApp'
        title={<h2>You have no permissions</h2>}
        body={
          <Fragment>
            {permissions && (
              <div>
                This section requires the{' '}
                {permissions.length > 1 ? 'permissions' : 'permission'}:
                {WzPermissionsFormatted(permissions)}
              </div>
            )}
            {permissions && administrator && <EuiSpacer />}
            {administrator && (
              <div>
                This section requires administrator privilegies:{' '}
                <strong key={`empty-prompt-no-roles-administrator`}>
                  {administrator}
                </strong>
              </div>
            )}
          </Fragment>
        }
        actions={actions}
      />
    );
  },
);
