/*
 * Cyb3rhq app - React hooks to manage allowed users
 * Copyright (C) 2015-2022 Cyb3rhq, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import { useSelector } from 'react-redux';
import { getFilterWithAuthorizedAgents } from '../../../react-services/filter-authorization-agents';

// It returns user allowed agents
export const useAllowedAgents = () => {
  const allowedAgents = useSelector(
    state => state.appStateReducers.allowedAgents,
  );
  const filterAllowedAgents = getFilterWithAuthorizedAgents(allowedAgents);
  return { allowedAgents, filterAllowedAgents };
};
