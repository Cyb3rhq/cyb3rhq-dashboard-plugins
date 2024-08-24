import { UIErrorLog } from '../error-orchestrator/types';

export interface ICyb3rhqErrorLogOpts extends Omit<UIErrorLog,'context'> {}
export interface IErrorOpts {
  error: Error;
  message: string;
  code?: number;
}

export interface ICyb3rhqError extends Error, IErrorOpts {
  error: Error;
  message: string;
  code?: number;
  logOptions: ICyb3rhqErrorLogOpts;
}

export interface ICyb3rhqErrorConstructor {
  new (error: Error, info: ICyb3rhqErrorInfo): ICyb3rhqError;
}

export interface ICyb3rhqErrorInfo {
  message: string;
  code?: number;
}
