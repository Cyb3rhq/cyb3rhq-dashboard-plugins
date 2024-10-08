/*
 * Cyb3rhq app - Error factory class
 * Copyright (C) 2015-2022 Cyb3rhq, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import {
  ICyb3rhqError,
  ICyb3rhqErrorConstructor,
} from '../types';
import { IErrorOpts } from '../types';

export class ErrorFactory {
  /**
   * Create an new error instance receiving an error instance or a string
   * Paste error stack in new error
   * @param error
   * @param ErrorType
   * @param message
   * @returns Error instance
   */
  public static create(
    ErrorType: ICyb3rhqErrorConstructor,
    opts: IErrorOpts,
  ): Error | ICyb3rhqError {
    return ErrorFactory.errorCreator(ErrorType, opts);
  }

  /**
   * Create an new error instance receiving a Error Type and message
   * @param errorType Error instance to create
   * @param message
   * @returns Error instance depending type received
   */

  private static errorCreator(
    ErrorType: ICyb3rhqErrorConstructor,
    opts: IErrorOpts,
  ): ICyb3rhqError {
    return new ErrorType(opts?.error, { message: opts?.message, code: opts?.code });
  }
}
