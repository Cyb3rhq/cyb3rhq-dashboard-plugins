/*
 * Cyb3rhq app - React component for show configuration of active response - command tab.
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
import PropTypes from 'prop-types';

import WzNoConfig from '../util-components/no-config';
import WzConfigurationSettingsHeader from '../util-components/configuration-settings-header';
import WzConfigurationSettingsListSelector from '../util-components/configuration-settings-list-selector';
import { isString, renderValueNoThenEnabled } from '../utils/utils';
import { settingsListBuilder } from '../utils/builders';

import { connect } from 'react-redux';

import { webDocumentationLink } from '../../../../../../../common/services/web_documentation';

const helpLinks = [
  {
    text: 'Active response documentation',
    href: webDocumentationLink(
      'user-manual/capabilities/active-response/index.html',
    ),
  },
  {
    text: 'Commands reference',
    href: webDocumentationLink(
      'user-manual/reference/ossec-conf/commands.html',
    ),
  },
];

const mainSettings = [
  { field: 'name', label: 'Command name' },
  { field: 'executable', label: 'Name of executable file' },
  { field: 'expect', label: 'List of expected fields' },
  { field: 'extra_args', label: 'Extra arguments' },
  {
    field: 'timeout_allowed',
    label: 'Allow this command to be reverted',
    render: renderValueNoThenEnabled,
  },
];

class WzConfigurationActiveResponseCommands extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, cyb3rhqNotReadyYet } = this.props;
    const items =
      currentConfig &&
      currentConfig['analysis-command'] &&
      currentConfig['analysis-command'].command
        ? settingsListBuilder(currentConfig['analysis-command'].command, 'name')
        : [];
    return (
      <Fragment>
        {currentConfig['analysis-command'] &&
          isString(currentConfig['analysis-command']) && (
            <WzNoConfig
              error={currentConfig['analysis-command']}
              help={helpLinks}
            />
          )}
        {currentConfig['analysis-command'] &&
          !isString(currentConfig['analysis-command']) &&
          currentConfig['analysis-command'].command &&
          !currentConfig['analysis-command'].command.length && (
            <WzNoConfig error='not-present' help={helpLinks} />
          )}
        {cyb3rhqNotReadyYet &&
          (!currentConfig || !currentConfig['analysis-command']) && (
            <WzNoConfig error='Server not ready yet' help={helpLinks} />
          )}
        {currentConfig['analysis-command'] &&
        !isString(currentConfig['analysis-command']) &&
        currentConfig['analysis-command'].command &&
        currentConfig['analysis-command'].command.length ? (
          <WzConfigurationSettingsHeader
            title='Command definitions'
            description='Find here all the currently defined commands used for Active response'
            help={helpLinks}
          >
            <WzConfigurationSettingsListSelector
              items={items}
              settings={mainSettings}
            />
          </WzConfigurationSettingsHeader>
        ) : null}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cyb3rhqNotReadyYet: state.appStateReducers.cyb3rhqNotReadyYet,
});

WzConfigurationActiveResponseCommands.propTypes = {
  cyb3rhqNotReadyYet: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default connect(mapStateToProps)(WzConfigurationActiveResponseCommands);
