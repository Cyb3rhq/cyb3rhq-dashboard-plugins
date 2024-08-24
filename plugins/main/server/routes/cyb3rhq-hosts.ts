/*
 * Cyb3rhq app - Module for Cyb3rhq-API routes
 * Copyright (C) 2015-2022 Cyb3rhq, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { Cyb3rhqHostsCtrl } from '../controllers';
import { IRouter } from 'opensearch_dashboards/server';

export function Cyb3rhqHostsRoutes(router: IRouter, services) {
  const ctrl = new Cyb3rhqHostsCtrl();

  // Get Cyb3rhq-API entries list (Multimanager) from elasticsearch index
  router.get(
    {
      path: '/hosts/apis',
      validate: false,
    },
    async (context, request, response) =>
      ctrl.getHostsEntries(context, request, response),
  );
}
