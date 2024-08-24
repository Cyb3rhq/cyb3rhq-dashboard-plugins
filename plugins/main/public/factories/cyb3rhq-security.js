/*
 * Cyb3rhq app - Factory to store visualizations handlers
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

import { WzSecurityOpenSearchDashboardsSecurity } from '../react-services/wz-security-opensearch-dashboards-security';
import { CYB3RHQ_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY } from '../../common/constants';
import store from '../redux/store';


export class Cyb3rhqSecurity {
  /**
   * Class constructor
   */
  constructor() {
    if (!!Cyb3rhqSecurity.instance) {
      return Cyb3rhqSecurity.instance;
    }
    const platform = store.getState().appStateReducers.currentPlatform;
    if(platform === CYB3RHQ_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY){
     this.security = WzSecurityOpenSearchDashboardsSecurity;
    }else{
      this.security = false;
    }

    Cyb3rhqSecurity.instance = this;
    return this;
  }

}
