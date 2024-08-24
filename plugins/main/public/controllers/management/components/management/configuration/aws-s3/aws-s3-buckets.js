/*
 * Cyb3rhq app - React component for show configuration of AWS S3 - buckets tab.
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
import WzConfigurationListSelector from '../util-components/configuration-settings-list-selector';
import { settingsListBuilder } from '../utils/builders';
import helpLinks from './help-links';

import { connect } from 'react-redux';

const mainSettings = [
  { field: 'name', label: 'Bucket name' },
  { field: 'type', label: 'Bucket type' },
  { field: 'aws_account_id', label: 'AWS account ID' },
  { field: 'aws_account_alias', label: 'AWS account alias' },
  { field: 'aws_profile', label: 'Profile name with read permissions' },
  { field: 'iam_role_arn', label: 'IAM ARN role to read bucket logs' },
  { field: 'path', label: 'Bucket path' },
  { field: 'only_logs_after', label: 'Parse only logs from this date onwards' },
  { field: 'remove_from_bucket', label: 'Remove bucket logs after being read' },
  { field: 'regions', label: 'Limit log parsing to these regions' },
];

class WzConfigurationAmazonS3Buckets extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const { currentConfig, wodleConfig, cyb3rhqNotReadyYet } = this.props;
    const items =
      wodleConfig && wodleConfig['aws-s3'] && wodleConfig['aws-s3'].buckets
        ? settingsListBuilder(wodleConfig['aws-s3'].buckets, 'name')
        : {};
    return (
      <Fragment>
        {currentConfig &&
          (!wodleConfig['aws-s3'] ||
            (wodleConfig['aws-s3'] && !wodleConfig['aws-s3'].buckets)) && (
            <WzNoConfig error='not-present' help={helpLinks} />
          )}
        {cyb3rhqNotReadyYet && (!currentConfig || !wodleConfig['aws-s3']) && (
          <WzNoConfig error='Server not ready yet' help={helpLinks} />
        )}
        {currentConfig &&
          wodleConfig['aws-s3'] &&
          wodleConfig['aws-s3'].buckets && (
            <WzConfigurationSettingsHeader
              title='Main settings'
              description='Amazon buckets from where logs are read'
              help={helpLinks}
            >
              <WzConfigurationListSelector
                items={items}
                settings={mainSettings}
              />
            </WzConfigurationSettingsHeader>
          )}
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  cyb3rhqNotReadyYet: state.appStateReducers.cyb3rhqNotReadyYet,
});

WzConfigurationAmazonS3Buckets.propTypes = {
  cyb3rhqNotReadyYet: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
};

export default connect(mapStateToProps)(WzConfigurationAmazonS3Buckets);
