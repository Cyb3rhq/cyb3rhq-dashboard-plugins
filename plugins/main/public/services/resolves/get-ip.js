/*
 * Cyb3rhq app - Module to fetch index patterns
 * Copyright (C) 2015-2022 Cyb3rhq, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import { healthCheck } from './health-check';
import { AppState } from '../../react-services/app-state';
import { getDataPlugin, getSavedObjects } from '../../kibana-services';
import { Cyb3rhqConfig } from '../../react-services/cyb3rhq-config';
import { getWzConfig } from './get-config';
import { UI_LOGGER_LEVELS } from '../../../common/constants';
import { UI_ERROR_SEVERITIES } from '../../react-services/error-orchestrator/types';
import { getErrorOrchestrator } from '../../react-services/common-services';
import { StatisticsDataSource } from '../../components/common/data-source/pattern/statistics';
import NavigationService from '../../react-services/navigation-service';

export async function getIp() {
  const checkCyb3rhqPatterns = async indexPatterns => {
    const configuration = await getWzConfig(new Cyb3rhqConfig());
    const STATISTICS_PATTERN_IDENTIFIER =
      StatisticsDataSource.getIdentifierDataSourcePattern();
    const cyb3rhqPatterns = [
      `${configuration['cyb3rhq.monitoring.pattern']}`,
      STATISTICS_PATTERN_IDENTIFIER,
    ];
    return cyb3rhqPatterns.every(pattern => {
      return indexPatterns.find(element => element.id === pattern);
    });
  };

  const buildSavedObjectsClient = async () => {
    try {
      const savedObjectsClient = getSavedObjects().client;

      const savedObjectsData = await savedObjectsClient.find({
        type: 'index-pattern',
        fields: ['title'],
        perPage: 10000,
      });

      const { savedObjects } = savedObjectsData;

      const currentPattern = AppState.getCurrentPattern() || '';

      if (
        !currentPattern ||
        !savedObjects.find(element => element.id === currentPattern) ||
        !(await checkCyb3rhqPatterns(savedObjects))
      ) {
        if (
          !NavigationService.getInstance()
            .getPathname()
            .includes('/health-check')
        ) {
          NavigationService.getInstance().navigate({
            pathname: '/health-check',
            state: {
              prevLocation: NavigationService.getInstance().getLocation(),
            },
          });
        }
      }

      const onlyCyb3rhqAlerts = savedObjects.filter(
        element => element.id === currentPattern,
      );

      if (!onlyCyb3rhqAlerts || !onlyCyb3rhqAlerts.length) {
        // There's now selected ip
        AppState.removeCurrentPattern();
        return 'No ip';
      }

      const courierData = await getDataPlugin().indexPatterns.get(
        currentPattern,
      );

      return {
        list: onlyCyb3rhqAlerts,
        loaded: courierData,
        stateVal: null,
        stateValFound: false,
      };
    } catch (error) {
      const options = {
        context: `${getIp.name}.checkCyb3rhqPatterns`,
        level: UI_LOGGER_LEVELS.ERROR,
        severity: UI_ERROR_SEVERITIES.CRITICAL,
        store: true,
        error: {
          error: error,
          message:
            (error?.body?.message?.includes('no permissions for') &&
              `You have no permissions. Contact to an administrator:\n${error?.body?.message}`) ||
            error.message ||
            error,
          title: error.name || error,
        },
      };
      getErrorOrchestrator().handleError(options);
      throw error;
    }
  };

  const currentParams = new URLSearchParams(
    NavigationService.getInstance().getSearch(),
  );
  const targetedRule =
    currentParams &&
    currentParams.get('tab') === 'ruleset' &&
    currentParams.get('ruleid');
  if (!targetedRule && healthCheck()) {
    NavigationService.getInstance().navigate({
      pathname: '/health-check',
      state: { prevLocation: NavigationService.getInstance().getLocation() },
    });
  } else {
    await buildSavedObjectsClient();
  }
}
