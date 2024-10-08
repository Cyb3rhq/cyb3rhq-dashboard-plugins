import { resolve } from 'path';
import { resolveKibanaPath } from '@osd/plugin-helpers';

import { pageObjects } from './page_objects';
import { services } from './services';

export default async function({ readConfigFile }) {
  const kibanaConfig = await readConfigFile(
    resolveKibanaPath('test/functional/config.js')
  );

  return {
    testFiles: [require.resolve('./apps/overview')],

    services: {
      ...kibanaConfig.get('services'),
      ...services
    },

    pageObjects: {
      ...kibanaConfig.get('pageObjects'),
      ...pageObjects
    },

    apps: {
      ...kibanaConfig.get('apps'),
      cyb3rhq: {
        pathname: '/app/cyb3rhq'
      }
    },

    esArchiver: {
      directory: resolve(__dirname, './es_archives')
    },

    screenshots: {
      directory: resolve(__dirname, './tmp/screenshots')
    },

    servers: kibanaConfig.get('servers'),

    esTestCluster: kibanaConfig.get('esTestCluster'),

    kbnTestServer: {
      ...kibanaConfig.get('kbnTestServer'),
      serverArgs: [
        ...kibanaConfig.get('kbnTestServer.serverArgs'),
        '--oss',
        `--plugin-path=${resolve(__dirname, '../../')}`
      ]
    }
  };
}
