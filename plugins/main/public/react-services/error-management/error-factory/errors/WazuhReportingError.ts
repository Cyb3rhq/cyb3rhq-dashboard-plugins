import { ICyb3rhqErrorInfo, ICyb3rhqErrorLogOpts } from '../../types';
import { HttpError } from './HttpError';

export class Cyb3rhqReportingError extends HttpError {
  constructor(error: Error, info?: ICyb3rhqErrorInfo) {
    super(error, info);
  }
}
