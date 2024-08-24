/*
 * Cyb3rhq app - Components compatibility operative system
 * Copyright (C) 2015-2022 Cyb3rhq, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import { CYB3RHQ_AGENTS_OS_TYPE, CYB3RHQ_MODULES_ID } from '../../common/constants';

export const UnsupportedComponents = {
  [CYB3RHQ_AGENTS_OS_TYPE.LINUX]: [],
  [CYB3RHQ_AGENTS_OS_TYPE.WINDOWS]: [CYB3RHQ_MODULES_ID.AUDITING, CYB3RHQ_MODULES_ID.DOCKER, CYB3RHQ_MODULES_ID.OPEN_SCAP],
  [CYB3RHQ_AGENTS_OS_TYPE.DARWIN]: [CYB3RHQ_MODULES_ID.AUDITING, CYB3RHQ_MODULES_ID.DOCKER, CYB3RHQ_MODULES_ID.OPEN_SCAP],
  [CYB3RHQ_AGENTS_OS_TYPE.SUNOS]: [CYB3RHQ_MODULES_ID.VULNERABILITIES],
  [CYB3RHQ_AGENTS_OS_TYPE.OTHERS]: [CYB3RHQ_MODULES_ID.AUDITING, CYB3RHQ_MODULES_ID.DOCKER, CYB3RHQ_MODULES_ID.OPEN_SCAP, CYB3RHQ_MODULES_ID.VULNERABILITIES]
};
