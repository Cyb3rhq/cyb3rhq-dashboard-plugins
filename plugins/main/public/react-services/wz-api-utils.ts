/*
 * Cyb3rhq app - Cyb3rhq API utils service
 * Copyright (C) 2015-2022 Cyb3rhq, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */

import { CYB3RHQ_API_RESERVED_ID_LOWER_THAN } from '../../common/constants';

export class WzAPIUtils{
  static isReservedID(id: number): boolean{
    return id < CYB3RHQ_API_RESERVED_ID_LOWER_THAN
  }
}