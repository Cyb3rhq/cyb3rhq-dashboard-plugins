import { ICyb3rhqErrorInfo, ICyb3rhqErrorLogOpts } from '../../types';
import Cyb3rhqError from './Cyb3rhqError';

export class HttpError extends Cyb3rhqError {
  logOptions: ICyb3rhqErrorLogOpts;
  constructor(error: Error, info?: ICyb3rhqErrorInfo) {
    super(error, info);
    this.logOptions = {
      error: {
        message: `[${this.constructor.name}]: ${error.message}`,
        title: `An error has occurred`,
        error: error,
      },
      level: 'ERROR',
      severity: 'BUSINESS',
      display: true,
      store: false,
    };
  }
}