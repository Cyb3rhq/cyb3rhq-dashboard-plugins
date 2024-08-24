import { IRouter } from 'opensearch_dashboards/server';
import { Cyb3rhqApiRoutes } from './cyb3rhq-api';
import { Cyb3rhqElasticRoutes } from './cyb3rhq-elastic';
import { Cyb3rhqHostsRoutes } from './cyb3rhq-hosts';
import { Cyb3rhqUtilsRoutes, UiLogsRoutes } from './cyb3rhq-utils';
import { Cyb3rhqReportingRoutes } from './cyb3rhq-reporting';

export const setupRoutes = (router: IRouter, services) => {
  Cyb3rhqApiRoutes(router, services);
  Cyb3rhqElasticRoutes(router, services);
  Cyb3rhqHostsRoutes(router, services);
  Cyb3rhqUtilsRoutes(router, services);
  Cyb3rhqReportingRoutes(router, services);
  UiLogsRoutes(router, services);
};
