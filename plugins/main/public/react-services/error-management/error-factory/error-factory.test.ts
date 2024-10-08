/*
 * Cyb3rhq app - Error handler service
 * Copyright (C) 2015-2022 Cyb3rhq, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorFactory } from './error-factory';
import {
  IndexerApiError,
  Cyb3rhqReportingError,
  HttpError,
  Cyb3rhqApiError,
} from './errors';
import Cyb3rhqError from './errors/Cyb3rhqError';

const response: AxiosResponse = {
  data: {
    statusCode: 500,
    error: 'Internal Server Error',
    message: '3099 - ERROR3099 - Server not ready yet',
  },
  status: 500,
  statusText: 'Internal Server Error',
  headers: {},
  config: {},
  request: {},
};

describe('Error Factory', () => {
  it.each([
    { errorType: IndexerApiError, name: 'IndexerApiError' },
    { errorType: Cyb3rhqApiError, name: 'Cyb3rhqApiError' },
    { errorType: Cyb3rhqReportingError, name: 'Cyb3rhqReportingError' },
    { errorType: HttpError, name: 'HttpError' },
  ])(
    'Should return a $name when receive and error and error type',
    ({ errorType, name }) => {
      let error = new Error('Error') as AxiosError;
      error = {
        ...error,
        ...response,
        stack: error.stack,
      };
      const errorCreated = ErrorFactory.create(errorType, {
        error,
        message: response.data.message,
      });
      expect(errorCreated.name).toBe(name);
      expect(errorCreated.stack).toBe(error.stack);
      expect(typeof errorCreated).not.toBe('string');
    },
  );

  it('Should return a new ERROR when receive and error and error type and keep the received error Stack Trace', () => {
    // creating an error with response property
    let error = new Error('Error') as AxiosError;
    error = {
      ...error,
      ...response,
      stack: error.stack,
    };
    const errorCreated = ErrorFactory.create(Cyb3rhqApiError, {
      error,
      message: response.data.message,
    });
    expect(errorCreated.name).toBe('Cyb3rhqApiError');
    expect(errorCreated.stack).toBe(error.stack);
    expect(typeof errorCreated).not.toBe('string');
  });

  it('Should return a new ERROR instance of Cyb3rhqError(the parent class)', () => {
    // creating an error with response property
    let error = new Error('Error') as AxiosError;
    error = {
      ...error,
      ...response,
      stack: error.stack,
    };
    const errorCreated = ErrorFactory.create(Cyb3rhqApiError, {
      error,
      message: response.data.message,
    });
    expect(errorCreated).toBeInstanceOf(Cyb3rhqError);
  });

  it('Should return a new ERROR with the error type received like class name', () => {
    // creating an error with response property
    let error = new Error('Error') as AxiosError;
    error = {
      ...error,
      ...response,
      stack: error.stack,
    };
    const errorCreated = ErrorFactory.create(Cyb3rhqApiError, {
      error,
      message: response.data.message,
    });
    expect(errorCreated.name).toBe('Cyb3rhqApiError');
  });
});
