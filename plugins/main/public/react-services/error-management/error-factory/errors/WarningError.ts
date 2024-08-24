import { ICyb3rhqErrorInfo, ICyb3rhqErrorLogOpts } from '../../types';
import Cyb3rhqError from './Cyb3rhqError';

export class WarningError extends Cyb3rhqError {
  logOptions: ICyb3rhqErrorLogOpts;
  constructor(error: Error, info?: ICyb3rhqErrorInfo) {
    super(error, info);
    Object.setPrototypeOf(this, WarningError.prototype);
    this.logOptions = {
      error: {
        message: `[${this.constructor.name}]: ${error.message}`,
        title: `An warning has occurred`,
        error: error,
      },
      level: 'WARNING',
      severity: 'BUSINESS',
      display: true,
      store: false,
    };
  }
}
