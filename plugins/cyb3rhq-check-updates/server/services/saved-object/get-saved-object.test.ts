import {
  getInternalSavedObjectsClient,
  getCyb3rhqCore,
  getCyb3rhqCheckUpdatesServices,
} from '../../plugin-services';
import { getSavedObject } from './get-saved-object';

const mockedGetInternalObjectsClient =
  getInternalSavedObjectsClient as jest.Mock;
const mockedGetCyb3rhqCheckUpdatesServices =
  getCyb3rhqCheckUpdatesServices as jest.Mock;
jest.mock('../../plugin-services');

describe('getSavedObject function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('should return saved object', async () => {
    mockedGetInternalObjectsClient.mockImplementation(() => ({
      get: () => ({ attributes: 'value' }),
    }));

    const response = await getSavedObject('type');

    expect(response).toEqual('value');
  });

  test('should return an empty object', async () => {
    mockedGetInternalObjectsClient.mockImplementation(() => ({
      get: jest.fn().mockRejectedValue({ output: { statusCode: 404 } }),
    }));
    mockedGetCyb3rhqCheckUpdatesServices.mockImplementation(() => ({
      logger: {
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
      },
    }));

    const response = await getSavedObject('type');

    expect(response).toEqual({});
  });

  test('should return an error', async () => {
    mockedGetInternalObjectsClient.mockImplementation(() => ({
      get: jest.fn().mockRejectedValue(new Error('getSavedObject error')),
    }));
    mockedGetCyb3rhqCheckUpdatesServices.mockImplementation(() => ({
      logger: {
        debug: jest.fn(),
        info: jest.fn(),
        warn: jest.fn(),
        error: jest.fn(),
      },
    }));

    const promise = getSavedObject('type');

    await expect(promise).rejects.toThrow('getSavedObject error');
  });
});
