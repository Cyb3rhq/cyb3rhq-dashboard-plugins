/*
 * Cyb3rhq app - React component information about MITRE top tactics.
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
import {
  buildExistsFilter,
  buildPhraseFilter,
} from '../../../../../../../../../src/plugins/data/common';

import { AppState } from '../../../../../../react-services/app-state';
import {
  getIndexPattern,
  getElasticAlerts,
  IFilterParams,
} from '../../../../../../react-services';

function createFilters(indexPattern, agentId, tactic: string | undefined) {
  const filter = filter => {
    return {
      ...buildPhraseFilter(
        { name: filter.name, type: 'text' },
        filter.value,
        indexPattern,
      ),
      $state: { store: 'appState' },
    };
  };
  const cyb3rhqFilter = getCyb3rhqFilter();
  const filters = [
    cyb3rhqFilter,
    { name: 'agent.id', value: agentId },
    ...(tactic ? [{ name: 'rule.mitre.tactic', value: tactic }] : []),
  ];
  return filters.map(filter);
}

function createExistsFilter(indexPattern) {
  return buildExistsFilter(
    { name: `rule.mitre.id`, type: 'nested' },
    indexPattern,
  );
}

function getCyb3rhqFilter() {
  const clusterInfo = AppState.getClusterInfo();
  const cyb3rhqFilter = {
    name: clusterInfo.status === 'enabled' ? 'cluster.name' : 'manager.name',
    value:
      clusterInfo.status === 'enabled'
        ? clusterInfo.cluster
        : clusterInfo.manager,
  };
  return cyb3rhqFilter;
}

export async function getMitreCount(agentId, time, tactic: string | undefined) {
  const indexPattern = await getIndexPattern();
  const filterParams: IFilterParams = {
    filters: [
      ...createFilters(indexPattern, agentId, tactic),
      createExistsFilter(indexPattern),
    ],
    query: { query: '', language: 'kuery' },
    time,
  };
  const args = {
    tactics: {
      terms: {
        field: `rule.mitre.${tactic ? 'id' : 'tactic'}`,
        size: 5,
      },
    },
  };
  const response = await getElasticAlerts(indexPattern, filterParams, args, {
    size: 0,
  });
  return (
    ((((response || {}).data || {}).aggregations || {}).tactics || {})
      .buckets || []
  );
}
