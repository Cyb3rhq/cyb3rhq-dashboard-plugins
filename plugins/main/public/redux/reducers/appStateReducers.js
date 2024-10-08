/*
 * Cyb3rhq app - App State Reducers
 * Copyright (C) 2015-2022 Cyb3rhq, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

const initialState = {
  currentAPI: '',
  showMenu: false,
  cyb3rhqNotReadyYet: '',
  currentTab: '',
  currentPlatform: false,
  currentAgentData: JSON.parse(
    window.sessionStorage.getItem('wz-shared-selected-agent') || '{}',
  ),
  showExploreAgentModalGlobal: false,
  userPermissions: false,
  toastNotification: false,
  withUserLogged: false,
  allowedAgents: [],
  logtestToken: '',
  userAccount: {
    administrator: false,
    administrator_requirements: '',
  },
};

const appStateReducers = (state = initialState, action) => {
  if (action.type === 'UPDATE_CURRENT_API') {
    return {
      ...state,
      currentAPI: action.currentAPI,
    };
  }

  if (action.type === 'SHOW_MENU') {
    return {
      ...state,
      showMenu: action.showMenu,
    };
  }

  if (action.type === 'UPDATE_CYB3RHQ_NOT_READY_YET') {
    return {
      ...state,
      cyb3rhqNotReadyYet: action.cyb3rhqNotReadyYet,
    };
  }

  if (action.type === 'UPDATE_CYB3RHQ_CURRENT_TAB') {
    return {
      ...state,
      currentTab: action.currentTab,
    };
  }

  if (action.type === 'UPDATE_CURRENT_PLATFORM') {
    return {
      ...state,
      currentPlatform: action.currentPlatform,
    };
  }

  if (action.type === 'UPDATE_USER_ACCOUNT') {
    return {
      ...state,
      userAccount: action.userAccount,
    };
  }

  if (action.type === 'UPDATE_SELECTED_AGENT_DATA') {
    window.sessionStorage.setItem(
      'wz-shared-selected-agent',
      JSON.stringify(action.currentAgentData),
    );
    return {
      ...state,
      currentAgentData: action.currentAgentData,
    };
  }

  if (action.type === 'SHOW_EXPLORE_AGENT_MODAL_GLOBAL') {
    return {
      ...state,
      showExploreAgentModalGlobal: action.showExploreAgentModalGlobal,
    };
  }

  if (action.type === 'UPDATE_USER_PERMISSIONS') {
    return {
      ...state,
      userPermissions: action.userPermissions,
    };
  }

  if (action.type === 'UPDATE_TOAST_NOTIFICATIONS_MODAL') {
    return {
      ...state,
      toastNotification: action.toastNotification,
    };
  }

  if (action.type === 'UPDATE_WITH_USER_LOGGED') {
    return {
      ...state,
      withUserLogged: action.withUserLogged,
    };
  }

  if (action.type === 'GET_ALLOWED_AGENTS') {
    return {
      ...state,
      allowedAgents: action.allowedAgents,
    };
  }

  if (action.type === 'UPDATE_LOGTEST_TOKEN') {
    return {
      ...state,
      logtestToken: action.logtestToken,
    };
  }

  return state;
};

export default appStateReducers;
