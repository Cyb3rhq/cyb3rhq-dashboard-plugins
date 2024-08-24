// To launch this file
// yarn test:jest --testEnvironment node --verbose server/routes/cyb3rhq-hosts
import supertest from 'supertest';
import { createMockPlatformServer } from '../mocks/platform-server.mock';
import { Cyb3rhqHostsRoutes } from './cyb3rhq-hosts';

function noop() {}
const logger = {
  debug: noop,
  info: noop,
  warn: noop,
  error: noop,
};
const context = {
  cyb3rhq: {
    logger,
  },
  cyb3rhq_core: {
    configuration: {
      _settings: new Map(),
      logger,
      get: jest.fn(),
      set: jest.fn(),
    },
    manageHosts: {
      getEntries: jest.fn(),
      create: jest.fn(),
    },
    dashboardSecurity: {
      isAdministratorUser: jest.fn(),
    },
  },
};
const mockPlatformServer = createMockPlatformServer(context);

beforeAll(async () => {
  // Register settings
  context.cyb3rhq_core.configuration._settings.set('hosts', {
    options: {
      arrayOf: {
        id: {},
        url: {},
        port: {},
        username: {},
        password: {},
        run_as: {},
      },
    },
  });
  const registerRoutes = router =>
    Cyb3rhqHostsRoutes(router, {
      configuration: context.cyb3rhq_core.configuration,
    });
  await mockPlatformServer.start(registerRoutes);
});

afterAll(async () => {
  await mockPlatformServer.stop();
});

describe('[endpoint] GET /hosts/apis', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it.each`
    storedAPIs
    ${[{
    id: 'default',
    url: 'https://localhost',
    port: 55000,
    username: 'test',
    password: 'test',
    run_as: false,
  }]}
    ${[{
    id: 'default',
    url: 'https://localhost',
    port: 55000,
    username: 'test',
    password: 'test',
    run_as: false,
  }, {
    id: 'default2',
    url: 'https://localhost',
    port: 55000,
    username: 'test',
    password: 'test',
    run_as: false,
  }]}
  `('Get API hosts', async ({ storedAPIs }) => {
    let currentAPIs = storedAPIs;
    context.cyb3rhq_core.manageHosts.getEntries.mockImplementation(() =>
      currentAPIs.map(currentAPI => ({ ...currentAPI, cluster_info: {} })),
    );
    const response = await supertest(mockPlatformServer.getServerListener())
      .get(`/hosts/apis`)
      .expect(200);

    currentAPIs.forEach((currentAPI, index) => {
      Object.keys(currentAPI).forEach(key => {
        expect(response.body[index][key]).toBe(currentAPI[key]);
      });
      expect(response.body[index].cluster_info).toBeDefined();
    });
  });
});
