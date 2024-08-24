/*
 * Cyb3rhq app - React component for show configuration of policy monitoring - ignored tab.
 * Copyright (C) 2015-2022 Cyb3rhq, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import React, { Component, Fragment } from 'react';

import { EuiBasicTable, EuiSpacer } from '@elastic/eui';

import WzNoConfig from '../util-components/no-config';
import WzConfigurationSettingsHeader from '../util-components/configuration-settings-header';
import { isString } from '../utils/utils';
import helpLinks from './help-links.js';

const columnsIgnore = [{ field: 'path', name: 'Path' }];

const columnsIgnoreSregex = [{ field: 'sreg', name: 'Sregex' }];

class WzConfigurationPolicyMonitoringSystemAudit extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig } = this.props;
    return (
      <Fragment>
        {currentConfig['syscheck-rootcheck'] &&
          isString(currentConfig['syscheck-rootcheck']) && (
            <WzNoConfig
              error={currentConfig['syscheck-rootcheck']}
              help={helpLinks}
            />
          )}
        {currentConfig &&
          currentConfig['syscheck-rootcheck'] &&
          currentConfig['syscheck-rootcheck'].rootcheck &&
          (!currentConfig['syscheck-rootcheck'].rootcheck.ignore ||
            (currentConfig['syscheck-rootcheck'].rootcheck.ignore &&
              !currentConfig['syscheck-rootcheck'].rootcheck.ignore
                .length)) && (
            <WzNoConfig error="not-present" help={helpLinks} />
          )}
        {currentConfig &&
        currentConfig['syscheck-rootcheck'] &&
        currentConfig['syscheck-rootcheck'].rootcheck &&
        currentConfig['syscheck-rootcheck'].rootcheck.ignore &&
        currentConfig['syscheck-rootcheck'].rootcheck.ignore.length ? (
          <WzConfigurationSettingsHeader
            title="Ignored files and directories"
            description="These files and directories are ignored from the rootcheck scan"
            help={helpLinks}
          >
            {(currentConfig['syscheck-rootcheck'].rootcheck.ignore || {})
              .length && (
              <Fragment>
                <EuiBasicTable
                  items={currentConfig[
                    'syscheck-rootcheck'
                  ].rootcheck.ignore.map(item => ({ path: item }))}
                  columns={columnsIgnore}
                />
                <EuiSpacer size="m" />
              </Fragment>
            )}
            {(currentConfig['syscheck-rootcheck'].rootcheck.ignore_sregex || {})
              .length && (
              <Fragment>
                <EuiBasicTable
                  items={currentConfig[
                    'syscheck-rootcheck'
                  ].rootcheck.ignore_sregex.map(item => ({ sreg: item }))}
                  columns={columnsIgnoreSregex}
                />
              </Fragment>
            )}
          </WzConfigurationSettingsHeader>
        ) : null}
      </Fragment>
    );
  }
}

export default WzConfigurationPolicyMonitoringSystemAudit;
