/*
 * Cyb3rhq app - React component information about last SCA scan.
 *
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
import {
  EuiFlexGroup,
  EuiFlexItem,
  EuiPanel,
  EuiTitle,
  EuiText,
  EuiLink,
  EuiBadge,
  EuiSpacer,
  EuiLoadingChart,
  EuiButtonIcon,
  EuiToolTip,
  EuiEmptyPrompt,
} from '@elastic/eui';
import moment from 'moment-timezone';
import { WzRequest } from '../../../../../react-services';
import { formatUIDate } from '../../../../../react-services/time-service';
import { getCore } from '../../../../../kibana-services';
import { withUserAuthorizationPrompt } from '../../../hocs';
import { compose } from 'redux';
import SCAPoliciesTable from '../../../../agents/sca/inventory/agent-policies-table';
import { MODULE_SCA_CHECK_RESULT_LABEL } from '../../../../../../common/constants';
import {
  configurationAssessment,
  endpointSummary,
} from '../../../../../utils/applications';
import { RedirectAppLinks } from '../../../../../../../../src/plugins/opensearch_dashboards_react/public';
import { PinnedAgentManager } from '../../../../wz-agent-selector/wz-agent-selector-service';
import NavigationService from '../../../../../react-services/navigation-service';

type Props = {
  agent: { [key in string]: any };
};

export const ScaScan = compose(
  withUserAuthorizationPrompt([
    [
      { action: 'agent:read', resource: 'agent:id:*' },
      { action: 'agent:read', resource: 'agent:group:*' },
    ],
    [
      { action: 'sca:read', resource: 'agent:id:*' },
      { action: 'sca:read', resource: 'agent:group:*' },
    ],
  ]),
)(
  class ScaScan extends Component<Props> {
    _isMount = false;
    state: {
      lastScan: {
        [key: string]: any;
      };
      isLoading: Boolean;
      firstTable: Boolean;
      policies: any[];
    };

    pinnedAgentManager: PinnedAgentManager;

    constructor(props) {
      super(props);
      this.pinnedAgentManager = new PinnedAgentManager();
      this.state = {
        lastScan: {},
        isLoading: true,
        firstTable: true,
        policies: [],
      };
    }

    async componentDidMount() {
      const storedPolicies = localStorage.getItem('scaPolicies');
      if (storedPolicies) {
        this.setState({ policies: JSON.parse(storedPolicies) });
      }
      this._isMount = true;
      this.getLastScan(this.props.agent.id);
    }

    async componentDidUpdate(prevProps: Readonly<Props>) {
      if (prevProps.agent.id !== this.props.agent.id) {
        this.getLastScan(this.props.agent.id);
      }
    }

    async getLastScan(agentId: Number) {
      const scans = await WzRequest.apiReq(
        'GET',
        `/sca/${agentId}?sort=-end_scan`,
        { params: { limit: 1 } },
      );
      this._isMount &&
        this.setState({
          lastScan: (((scans.data || {}).data || {}).affected_items || {})[0],
          isLoading: false,
        });
    }

    durationScan() {
      const { lastScan } = this.state;
      const start_scan = moment(lastScan.start_scan);
      const end_scan = moment(lastScan.end_scan);
      let diff = start_scan.diff(end_scan);
      let duration = moment.duration(diff);
      let auxDuration =
        Math.floor(duration.asHours()) + moment.utc(diff).format(':mm:ss');
      return auxDuration === '0:00:00' ? '< 1s' : auxDuration;
    }

    renderLoadingStatus() {
      const { isLoading } = this.state;
      if (!isLoading) {
        return;
      } else {
        return (
          <EuiFlexGroup justifyContent='center' alignItems='center'>
            <EuiFlexItem grow={false}>
              <div
                style={{
                  display: 'block',
                  textAlign: 'center',
                  paddingTop: 100,
                }}
              >
                <EuiLoadingChart size='xl' />
              </div>
            </EuiFlexItem>
          </EuiFlexGroup>
        );
      }
    }

    onClickRow = policy => {
      const updatedPolicies = [...this.state.policies, policy];
      this.setState({ policies: updatedPolicies }, () => {
        localStorage.setItem(
          'scaPolicies',
          JSON.stringify(this.state.policies),
        );
        NavigationService.getInstance().navigateToApp(endpointSummary.id, {
          path: `#/overview?tab=sca&redirectPolicy=${policy.policy_id}&agentId=${this.props.agent.id}`,
        });
      });
    };

    renderScanDetails() {
      const { isLoading, lastScan } = this.state;
      if (isLoading || lastScan === undefined) return;

      const columnsPolicies = [
        {
          field: 'name',
          name: 'Policy',
          width: '40%',
        },
        {
          field: 'end_scan',
          name: 'End scan',
          dataType: 'date',
          render: formatUIDate,
          width: '20%',
        },
        {
          field: 'pass',
          name: MODULE_SCA_CHECK_RESULT_LABEL.passed,
          width: '10%',
        },
        {
          field: 'fail',
          name: MODULE_SCA_CHECK_RESULT_LABEL.failed,
          width: '10%',
        },
        {
          field: 'invalid',
          name: MODULE_SCA_CHECK_RESULT_LABEL['not applicable'],
          width: '10%',
        },
        {
          field: 'score',
          name: 'Score',
          width: '10%',
          render: score => {
            return `${score}%`;
          },
        },
      ];

      const tableProps = {
        tablePageSizeOptions: [4],
        hidePerPageOptions: true,
      };

      return (
        <Fragment>
          <EuiFlexGroup>
            <EuiFlexItem grow={false}>
              <RedirectAppLinks application={getCore().application}>
                <EuiTitle size='xs'>
                  <EuiLink
                    onClick={() => {
                      this.pinnedAgentManager.pinAgent(this.props.agent);
                    }}
                    href={NavigationService.getInstance().getUrlForApp(
                      configurationAssessment.id,
                      {
                        path: `#/overview?tab=sca&redirectPolicy=${lastScan?.policy_id}&agentId=${this.props.agent.id}`,
                      },
                    )}
                  >
                    <h4>{lastScan.name}</h4>
                    <EuiSpacer size='m' />
                  </EuiLink>
                </EuiTitle>
              </RedirectAppLinks>
            </EuiFlexItem>
            <EuiFlexItem grow={false} style={{ marginTop: 12 }}>
              <EuiBadge color='secondary'>{lastScan?.policy_id}</EuiBadge>
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiPanel>
            <SCAPoliciesTable
              agent={this.props.agent}
              columns={columnsPolicies}
              rowProps={this.onClickRow}
              tableProps={tableProps}
            />
          </EuiPanel>
        </Fragment>
      );
    }

    renderEmptyPrompt() {
      const { isLoading } = this.state;
      if (isLoading) return;
      return (
        <Fragment>
          <EuiEmptyPrompt
            iconType='visVega'
            title={<h4>You don't have SCA scans in this agent.</h4>}
            body={
              <Fragment>
                <p>Check your agent settings to generate scans.</p>
              </Fragment>
            }
          />
        </Fragment>
      );
    }

    render() {
      const { lastScan } = this.state;
      const loading = this.renderLoadingStatus();
      const scaScan = this.renderScanDetails();
      const emptyPrompt = this.renderEmptyPrompt();
      if (loading) {
        return (
          <EuiFlexItem>
            <EuiPanel paddingSize='m'>{loading}</EuiPanel>
          </EuiFlexItem>
        );
      }
      if (!lastScan) {
        return (
          <EuiFlexItem>
            <EuiPanel paddingSize='m'>{emptyPrompt}</EuiPanel>
          </EuiFlexItem>
        );
      }
      return (
        <EuiFlexItem>
          <EuiPanel paddingSize='m'>
            <EuiText size='xs'>
              <EuiFlexGroup className='wz-section-sca-euiFlexGroup'>
                <EuiFlexItem grow={false}>
                  <RedirectAppLinks application={getCore().application}>
                    <EuiTitle size='xs'>
                      <EuiLink
                        className='agents-link-item'
                        onClick={() => {
                          this.pinnedAgentManager.pinAgent(this.props.agent);
                        }}
                        href={NavigationService.getInstance().getUrlForApp(
                          configurationAssessment.id,
                          {
                            path: `#/overview?tab=sca&redirectPolicy=${lastScan?.policy_id}&agentId=${this.props.agent.id}`,
                          },
                        )}
                      >
                        <h2>SCA: Lastest scans</h2>
                      </EuiLink>
                    </EuiTitle>
                  </RedirectAppLinks>
                </EuiFlexItem>
                <EuiFlexItem grow={false}>
                  <RedirectAppLinks application={getCore().application}>
                    <EuiToolTip position='top' content='Open SCA Scans'>
                      <EuiButtonIcon
                        iconType='popout'
                        color='primary'
                        className='EuiButtonIcon'
                        onClick={() => {
                          this.pinnedAgentManager.pinAgent(this.props.agent);
                        }}
                        href={NavigationService.getInstance().getUrlForApp(
                          configurationAssessment.id,
                        )}
                        aria-label='Open SCA Scans'
                      />
                    </EuiToolTip>
                  </RedirectAppLinks>
                </EuiFlexItem>
              </EuiFlexGroup>
            </EuiText>
            {scaScan}
          </EuiPanel>
        </EuiFlexItem>
      );
    }
  },
);
