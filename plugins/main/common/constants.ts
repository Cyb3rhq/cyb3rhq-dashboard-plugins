/*
 * Cyb3rhq app - Cyb3rhq Constants file
 * Copyright (C) 2015-2022 Cyb3rhq, Inc.
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * Find more information about this on the LICENSE file.
 */
import path from 'path';
import { version } from '../package.json';

// Plugin
export const PLUGIN_VERSION = version;
export const PLUGIN_VERSION_SHORT = version.split('.').splice(0, 2).join('.');

// Index patterns - Cyb3rhq alerts
export const CYB3RHQ_INDEX_TYPE_ALERTS = 'alerts';
export const CYB3RHQ_ALERTS_PREFIX = 'cyb3rhq-alerts-';
export const CYB3RHQ_ALERTS_PATTERN = 'cyb3rhq-alerts-*';

// Job - Cyb3rhq monitoring
export const CYB3RHQ_INDEX_TYPE_MONITORING = 'monitoring';
export const CYB3RHQ_MONITORING_PREFIX = 'cyb3rhq-monitoring-';
export const CYB3RHQ_MONITORING_PATTERN = 'cyb3rhq-monitoring-*';
export const CYB3RHQ_MONITORING_TEMPLATE_NAME = 'cyb3rhq-agent';
export const CYB3RHQ_MONITORING_DEFAULT_INDICES_SHARDS = 1;
export const CYB3RHQ_MONITORING_DEFAULT_INDICES_REPLICAS = 0;
export const CYB3RHQ_MONITORING_DEFAULT_CREATION = 'w';
export const CYB3RHQ_MONITORING_DEFAULT_ENABLED = true;
export const CYB3RHQ_MONITORING_DEFAULT_FREQUENCY = 900;
export const CYB3RHQ_MONITORING_DEFAULT_CRON_FREQ = '0 * * * * *';

// Job - Cyb3rhq statistics
export const CYB3RHQ_INDEX_TYPE_STATISTICS = 'statistics';
export const CYB3RHQ_STATISTICS_DEFAULT_PREFIX = 'cyb3rhq';
export const CYB3RHQ_STATISTICS_DEFAULT_NAME = 'statistics';
export const CYB3RHQ_STATISTICS_PATTERN = `${CYB3RHQ_STATISTICS_DEFAULT_PREFIX}-${CYB3RHQ_STATISTICS_DEFAULT_NAME}-*`;
export const CYB3RHQ_STATISTICS_TEMPLATE_NAME = `${CYB3RHQ_STATISTICS_DEFAULT_PREFIX}-${CYB3RHQ_STATISTICS_DEFAULT_NAME}`;
export const CYB3RHQ_STATISTICS_DEFAULT_INDICES_SHARDS = 1;
export const CYB3RHQ_STATISTICS_DEFAULT_INDICES_REPLICAS = 0;
export const CYB3RHQ_STATISTICS_DEFAULT_CREATION = 'w';
export const CYB3RHQ_STATISTICS_DEFAULT_STATUS = true;
export const CYB3RHQ_STATISTICS_DEFAULT_FREQUENCY = 900;
export const CYB3RHQ_STATISTICS_DEFAULT_CRON_FREQ = '0 */5 * * * *';

// Cyb3rhq vulnerabilities
export const CYB3RHQ_VULNERABILITIES_PATTERN = 'cyb3rhq-states-vulnerabilities-*';
export const CYB3RHQ_INDEX_TYPE_VULNERABILITIES = 'vulnerabilities';
export const VULNERABILITY_IMPLICIT_CLUSTER_MODE_FILTER = 'cyb3rhq.cluster.name';

// Cyb3rhq Fleet
export const CYB3RHQ_FLEET_PATTERN = 'cyb3rhq-fleet-*';
export const CYB3RHQ_INDEX_TYPE_FLEET = 'fleet';
export const FLEET_IMPLICIT_CLUSTER_MODE_FILTER = 'cyb3rhq.cluster.name';

// Job - Cyb3rhq initialize
export const CYB3RHQ_PLUGIN_PLATFORM_TEMPLATE_NAME = 'cyb3rhq-kibana';

// Sample data
export const CYB3RHQ_SAMPLE_ALERT_PREFIX = 'cyb3rhq-alerts-4.x-';
export const CYB3RHQ_SAMPLE_ALERTS_INDEX_SHARDS = 1;
export const CYB3RHQ_SAMPLE_ALERTS_INDEX_REPLICAS = 0;
export const CYB3RHQ_SAMPLE_ALERTS_CATEGORY_SECURITY = 'security';
export const CYB3RHQ_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING =
  'auditing-policy-monitoring';
export const CYB3RHQ_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION = 'threat-detection';
export const CYB3RHQ_SAMPLE_ALERTS_DEFAULT_NUMBER_ALERTS = 3000;
export const CYB3RHQ_SAMPLE_ALERTS_CATEGORIES_TYPE_ALERTS = {
  [CYB3RHQ_SAMPLE_ALERTS_CATEGORY_SECURITY]: [
    { syscheck: true },
    { aws: true },
    { office: true },
    { gcp: true },
    { authentication: true },
    { ssh: true },
    { apache: true, alerts: 2000 },
    { web: true },
    { windows: { service_control_manager: true }, alerts: 1000 },
    { github: true },
  ],
  [CYB3RHQ_SAMPLE_ALERTS_CATEGORY_AUDITING_POLICY_MONITORING]: [
    { rootcheck: true },
    { audit: true },
    { openscap: true },
    { ciscat: true },
  ],
  [CYB3RHQ_SAMPLE_ALERTS_CATEGORY_THREAT_DETECTION]: [
    { vulnerabilities: true },
    { virustotal: true },
    { osquery: true },
    { docker: true },
    { mitre: true },
  ],
};

// Security
export const CYB3RHQ_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY =
  'OpenSearch Dashboards Security';

export const CYB3RHQ_SECURITY_PLUGINS = [
  CYB3RHQ_SECURITY_PLUGIN_OPENSEARCH_DASHBOARDS_SECURITY,
];

// App configuration
export const CYB3RHQ_CONFIGURATION_CACHE_TIME = 10000; // time in ms;

// Reserved ids for Users/Role mapping
export const CYB3RHQ_API_RESERVED_ID_LOWER_THAN = 100;
export const CYB3RHQ_API_RESERVED_WUI_SECURITY_RULES = [1, 2];

// Cyb3rhq data path
const CYB3RHQ_DATA_PLUGIN_PLATFORM_BASE_PATH = 'data';
export const CYB3RHQ_DATA_PLUGIN_PLATFORM_BASE_ABSOLUTE_PATH = path.join(
  __dirname,
  '../../../',
  CYB3RHQ_DATA_PLUGIN_PLATFORM_BASE_PATH,
);
export const CYB3RHQ_DATA_ABSOLUTE_PATH = path.join(
  CYB3RHQ_DATA_PLUGIN_PLATFORM_BASE_ABSOLUTE_PATH,
  'cyb3rhq',
);

// Cyb3rhq data path - config
export const CYB3RHQ_DATA_CONFIG_DIRECTORY_PATH = path.join(
  CYB3RHQ_DATA_ABSOLUTE_PATH,
  'config',
);
export const CYB3RHQ_DATA_CONFIG_REGISTRY_PATH = path.join(
  CYB3RHQ_DATA_CONFIG_DIRECTORY_PATH,
  'cyb3rhq-registry.json',
);

// Cyb3rhq data path - downloads
export const CYB3RHQ_DATA_DOWNLOADS_DIRECTORY_PATH = path.join(
  CYB3RHQ_DATA_ABSOLUTE_PATH,
  'downloads',
);
export const CYB3RHQ_DATA_DOWNLOADS_REPORTS_DIRECTORY_PATH = path.join(
  CYB3RHQ_DATA_DOWNLOADS_DIRECTORY_PATH,
  'reports',
);

// Queue
export const CYB3RHQ_QUEUE_CRON_FREQ = '*/15 * * * * *'; // Every 15 seconds

// Cyb3rhq errors
export const CYB3RHQ_ERROR_DAEMONS_NOT_READY = 'ERROR3099';

// Agents
export enum CYB3RHQ_AGENTS_OS_TYPE {
  WINDOWS = 'windows',
  LINUX = 'linux',
  SUNOS = 'sunos',
  DARWIN = 'darwin',
  OTHERS = '',
}

export enum CYB3RHQ_MODULES_ID {
  SECURITY_EVENTS = 'general',
  INTEGRITY_MONITORING = 'fim',
  AMAZON_WEB_SERVICES = 'aws',
  OFFICE_365 = 'office',
  GOOGLE_CLOUD_PLATFORM = 'gcp',
  POLICY_MONITORING = 'pm',
  SECURITY_CONFIGURATION_ASSESSMENT = 'sca',
  AUDITING = 'audit',
  OPEN_SCAP = 'oscap',
  VULNERABILITIES = 'vuls',
  OSQUERY = 'osquery',
  DOCKER = 'docker',
  MITRE_ATTACK = 'mitre',
  PCI_DSS = 'pci',
  HIPAA = 'hipaa',
  NIST_800_53 = 'nist',
  TSC = 'tsc',
  CIS_CAT = 'ciscat',
  VIRUSTOTAL = 'virustotal',
  GDPR = 'gdpr',
  GITHUB = 'github',
}

export enum CYB3RHQ_MENU_MANAGEMENT_SECTIONS_ID {
  MANAGEMENT = 'management',
  ADMINISTRATION = 'administration',
  RULESET = 'ruleset',
  RULES = 'rules',
  DECODERS = 'decoders',
  CDB_LISTS = 'lists',
  GROUPS = 'groups',
  CONFIGURATION = 'configuration',
  STATUS_AND_REPORTS = 'statusReports',
  STATUS = 'status',
  CLUSTER = 'monitoring',
  LOGS = 'logs',
  REPORTING = 'reporting',
  STATISTICS = 'statistics',
}

export enum CYB3RHQ_MENU_TOOLS_SECTIONS_ID {
  API_CONSOLE = 'devTools',
  RULESET_TEST = 'logtest',
}

export enum CYB3RHQ_MENU_SECURITY_SECTIONS_ID {
  USERS = 'users',
  ROLES = 'roles',
  POLICIES = 'policies',
  ROLES_MAPPING = 'roleMapping',
}

export enum CYB3RHQ_MENU_SETTINGS_SECTIONS_ID {
  SETTINGS = 'settings',
  API_CONFIGURATION = 'api',
  MODULES = 'modules',
  SAMPLE_DATA = 'sample_data',
  CONFIGURATION = 'configuration',
  LOGS = 'logs',
  MISCELLANEOUS = 'miscellaneous',
  ABOUT = 'about',
}

export const AUTHORIZED_AGENTS = 'hidden-authorized-agents';
export const DATA_SOURCE_FILTER_CONTROLLED_EXCLUDE_SERVER =
  'hidden-exclude-server';
export const DATA_SOURCE_FILTER_CONTROLLED_PINNED_AGENT = 'pinned-agent';
export const DATA_SOURCE_FILTER_CONTROLLED_CLUSTER_MANAGER = 'cluster-manager';
export const DATA_SOURCE_FILTER_CONTROLLED_REGULATORY_COMPLIANCE_REQUIREMENT =
  'hidden-regulatory-compliance-requirement';
export const DATA_SOURCE_FILTER_CONTROLLED_PCI_DSS_EXIST = 'pci-dss-exist';
export const DATA_SOURCE_FILTER_CONTROLLED_VULNERABILITIES_RULE_GROUP =
  'vulnerabilities-rule-group';
export const DATA_SOURCE_FILTER_CONTROLLED_OFFICE_365_RULE_GROUP =
  'office-365-rule-group';
export const DATA_SOURCE_FILTER_CONTROLLED_GITHUB_RULE_GROUP =
  'github-rule-group';
export const DATA_SOURCE_FILTER_CONTROLLED_TSC_EXIST = 'tsc-rule-exist';
export const DATA_SOURCE_FILTER_CONTROLLED_NIST_800_53_EXIST =
  'nist-800-53-rule-exist';
export const DATA_SOURCE_FILTER_CONTROLLED_GDPR_EXIST = 'gdpr-rule-exist';
export const DATA_SOURCE_FILTER_CONTROLLED_HIPAA_EXIST = 'hipaa-rule-exist';
export const DATA_SOURCE_FILTER_CONTROLLED_DOCKER_RULE_GROUP =
  'docker-rule-group';
export const DATA_SOURCE_FILTER_CONTROLLED_MITRE_ATTACK_RULE =
  'mitre-attack-rule';
export const DATA_SOURCE_FILTER_CONTROLLED_MITRE_ATTACK_RULE_ID =
  'hidden-mitre-attack-rule-id';
export const DATA_SOURCE_FILTER_CONTROLLED_VIRUSTOTAL_RULE_GROUP =
  'virustotal-rule-group';
export const DATA_SOURCE_FILTER_CONTROLLED_GOOGLE_CLOUD_RULE_GROUP =
  'gcp-rule-group';
export const DATA_SOURCE_FILTER_CONTROLLED_MALWARE_DETECTION_RULE_GROUP =
  'malware-detection-rule-group';
export const DATA_SOURCE_FILTER_CONTROLLED_AWS_RULE_GROUP = 'aws-rule-group';
export const DATA_SOURCE_FILTER_CONTROLLED_FIM_RULE_GROUP = 'fim-rule-group';
export const DATA_SOURCE_FILTER_CONTROLLED_CONFIGURATION_ASSASSMENT_RULE_GROUP =
  'configuration-assessment-rule-group';

// Cyb3rhq links
export const CYB3RHQ_LINK_GITHUB = 'https://github.com/cyb3rhq';
export const CYB3RHQ_LINK_GOOGLE_GROUPS =
  'https://groups.google.com/forum/#!forum/cyb3rhq';
export const CYB3RHQ_LINK_SLACK = 'https://wazuh.com/community/join-us-on-slack';

export const HEALTH_CHECK = 'health-check';

// Health check
export const HEALTH_CHECK_REDIRECTION_TIME = 300; //ms

// Plugin platform settings
// Default timeFilter set by the app
export const CYB3RHQ_PLUGIN_PLATFORM_SETTING_TIME_FILTER = {
  from: 'now-24h',
  to: 'now',
};
export const PLUGIN_PLATFORM_SETTING_NAME_TIME_FILTER =
  'timepicker:timeDefaults';

// Default maxBuckets set by the app
export const CYB3RHQ_PLUGIN_PLATFORM_SETTING_MAX_BUCKETS = 200000;
export const PLUGIN_PLATFORM_SETTING_NAME_MAX_BUCKETS = 'timeline:max_buckets';

// Default metaFields set by the app
export const CYB3RHQ_PLUGIN_PLATFORM_SETTING_METAFIELDS = ['_source', '_index'];
export const PLUGIN_PLATFORM_SETTING_NAME_METAFIELDS = 'metaFields';

// Logger
export const UI_LOGGER_LEVELS = {
  WARNING: 'WARNING',
  INFO: 'INFO',
  ERROR: 'ERROR',
};

export const UI_TOAST_COLOR = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
};

// Assets
export const ASSETS_BASE_URL_PREFIX = '/plugins/cyb3rhq/assets/';
export const ASSETS_PUBLIC_URL = '/plugins/cyb3rhq/public/assets/';

// Reports
export const REPORTS_LOGO_IMAGE_ASSETS_RELATIVE_PATH =
  'images/logo_reports.png';
export const REPORTS_PRIMARY_COLOR = '#256BD1';
export const REPORTS_PAGE_FOOTER_TEXT = 'Copyright © 2024 Cyb3rhq, Inc.';
export const REPORTS_PAGE_HEADER_TEXT = 'info@wazuh.com\nhttps://wazuh.com';

// Plugin platform
export const PLUGIN_PLATFORM_NAME = 'dashboard';
export const PLUGIN_PLATFORM_INSTALLATION_USER = 'cyb3rhq-dashboard';
export const PLUGIN_PLATFORM_INSTALLATION_USER_GROUP = 'cyb3rhq-dashboard';
export const PLUGIN_PLATFORM_CYB3RHQ_DOCUMENTATION_URL_PATH_UPGRADE_PLATFORM =
  'upgrade-guide';
export const PLUGIN_PLATFORM_CYB3RHQ_DOCUMENTATION_URL_PATH_TROUBLESHOOTING =
  'user-manual/cyb3rhq-dashboard/troubleshooting.html';
export const PLUGIN_PLATFORM_CYB3RHQ_DOCUMENTATION_URL_PATH_APP_CONFIGURATION =
  'user-manual/cyb3rhq-dashboard/config-file.html';
export const PLUGIN_PLATFORM_URL_GUIDE =
  'https://opensearch.org/docs/2.10/about';
export const PLUGIN_PLATFORM_URL_GUIDE_TITLE = 'OpenSearch guide';

export const PLUGIN_PLATFORM_REQUEST_HEADERS = {
  'osd-xsrf': 'kibana',
};

// Plugin app
export const PLUGIN_APP_NAME = 'dashboard';

// UI
export const UI_COLOR_STATUS = {
  success: '#007871',
  danger: '#BD271E',
  warning: '#FEC514',
  disabled: '#646A77',
  info: '#6092C0',
  default: '#000000',
} as const;

export const API_NAME_AGENT_STATUS = {
  ACTIVE: 'active',
  DISCONNECTED: 'disconnected',
  PENDING: 'pending',
  NEVER_CONNECTED: 'never_connected',
} as const;

export const UI_COLOR_AGENT_STATUS = {
  [API_NAME_AGENT_STATUS.ACTIVE]: UI_COLOR_STATUS.success,
  [API_NAME_AGENT_STATUS.DISCONNECTED]: UI_COLOR_STATUS.danger,
  [API_NAME_AGENT_STATUS.PENDING]: UI_COLOR_STATUS.warning,
  [API_NAME_AGENT_STATUS.NEVER_CONNECTED]: UI_COLOR_STATUS.disabled,
  default: UI_COLOR_STATUS.default,
} as const;

export const UI_LABEL_NAME_AGENT_STATUS = {
  [API_NAME_AGENT_STATUS.ACTIVE]: 'Active',
  [API_NAME_AGENT_STATUS.DISCONNECTED]: 'Disconnected',
  [API_NAME_AGENT_STATUS.PENDING]: 'Pending',
  [API_NAME_AGENT_STATUS.NEVER_CONNECTED]: 'Never connected',
  default: 'Unknown',
} as const;

export const UI_ORDER_AGENT_STATUS = [
  API_NAME_AGENT_STATUS.ACTIVE,
  API_NAME_AGENT_STATUS.DISCONNECTED,
  API_NAME_AGENT_STATUS.PENDING,
  API_NAME_AGENT_STATUS.NEVER_CONNECTED,
];

export const AGENT_SYNCED_STATUS = {
  SYNCED: 'synced',
  NOT_SYNCED: 'not synced',
};

// The status code can be seen here https://github.com/cyb3rhq/cyb3rhq/blob/686068a1f05d806b2e3b3d633a765320ae7ae114/src/cyb3rhq_db/wdb.h#L55-L61

export const AGENT_STATUS_CODE = [
  {
    STATUS_CODE: 0,
    STATUS_DESCRIPTION: 'Agent is connected',
  },
  {
    STATUS_CODE: 1,
    STATUS_DESCRIPTION: 'Invalid agent version',
  },
  {
    STATUS_CODE: 2,
    STATUS_DESCRIPTION: 'Error retrieving version',
  },
  {
    STATUS_CODE: 3,
    STATUS_DESCRIPTION: 'Shutdown message received',
  },
  {
    STATUS_CODE: 4,
    STATUS_DESCRIPTION: 'Disconnected because no keepalive received',
  },
  {
    STATUS_CODE: 5,
    STATUS_DESCRIPTION: 'Connection reset by manager',
  },
];

export const API_NAME_TASK_STATUS = {
  DONE: 'Done',
  IN_PROGRESS: 'In progress',
  FAILED: 'Failed',
  TIMEOUT: 'Timeout',
} as const;

export const UI_TASK_STATUS = [
  API_NAME_TASK_STATUS.DONE,
  API_NAME_TASK_STATUS.IN_PROGRESS,
  API_NAME_TASK_STATUS.FAILED,
  API_NAME_TASK_STATUS.TIMEOUT,
];

export const UI_TASK_STATUS_COLORS = {
  [API_NAME_TASK_STATUS.DONE]: 'success',
  [API_NAME_TASK_STATUS.IN_PROGRESS]: 'warning',
  [API_NAME_TASK_STATUS.FAILED]: 'danger',
  [API_NAME_TASK_STATUS.TIMEOUT]: 'subdued',
};

// Documentation
export const DOCUMENTATION_WEB_BASE_URL = 'https://documentation.wazuh.com';

// Default Elasticsearch user name context
export const ELASTIC_NAME = 'elastic';

// Default Cyb3rhq indexer name
export const CYB3RHQ_INDEXER_NAME = 'indexer';

// Not timeFieldName on index pattern
export const NOT_TIME_FIELD_NAME_INDEX_PATTERN =
  'not_time_field_name_index_pattern';

// Customization
export const CUSTOMIZATION_ENDPOINT_PAYLOAD_UPLOAD_CUSTOM_FILE_MAXIMUM_BYTES = 1048576;

export enum EpluginSettingType {
  text = 'text',
  textarea = 'textarea',
  switch = 'switch',
  number = 'number',
  editor = 'editor',
  select = 'select',
  filepicker = 'filepicker',
  password = 'password',
  arrayOf = 'arrayOf',
  custom = 'custom',
}

export enum HTTP_STATUS_CODES {
  CONTINUE = 100,
  SWITCHING_PROTOCOLS = 101,
  PROCESSING = 102,
  OK = 200,
  CREATED = 201,
  ACCEPTED = 202,
  NON_AUTHORITATIVE_INFORMATION = 203,
  NO_CONTENT = 204,
  RESET_CONTENT = 205,
  PARTIAL_CONTENT = 206,
  MULTI_STATUS = 207,
  MULTIPLE_CHOICES = 300,
  MOVED_PERMANENTLY = 301,
  MOVED_TEMPORARILY = 302,
  SEE_OTHER = 303,
  NOT_MODIFIED = 304,
  USE_PROXY = 305,
  TEMPORARY_REDIRECT = 307,
  PERMANENT_REDIRECT = 308,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  PAYMENT_REQUIRED = 402,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  METHOD_NOT_ALLOWED = 405,
  NOT_ACCEPTABLE = 406,
  PROXY_AUTHENTICATION_REQUIRED = 407,
  REQUEST_TIMEOUT = 408,
  CONFLICT = 409,
  GONE = 410,
  LENGTH_REQUIRED = 411,
  PRECONDITION_FAILED = 412,
  REQUEST_TOO_LONG = 413,
  REQUEST_URI_TOO_LONG = 414,
  UNSUPPORTED_MEDIA_TYPE = 415,
  REQUESTED_RANGE_NOT_SATISFIABLE = 416,
  EXPECTATION_FAILED = 417,
  IM_A_TEAPOT = 418,
  INSUFFICIENT_SPACE_ON_RESOURCE = 419,
  METHOD_FAILURE = 420,
  MISDIRECTED_REQUEST = 421,
  UNPROCESSABLE_ENTITY = 422,
  LOCKED = 423,
  FAILED_DEPENDENCY = 424,
  PRECONDITION_REQUIRED = 428,
  TOO_MANY_REQUESTS = 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
  UNAVAILABLE_FOR_LEGAL_REASONS = 451,
  INTERNAL_SERVER_ERROR = 500,
  NOT_IMPLEMENTED = 501,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
  HTTP_VERSION_NOT_SUPPORTED = 505,
  INSUFFICIENT_STORAGE = 507,
  NETWORK_AUTHENTICATION_REQUIRED = 511,
}

// Module Security configuration assessment
export const MODULE_SCA_CHECK_RESULT_LABEL = {
  passed: 'Passed',
  failed: 'Failed',
  'not applicable': 'Not applicable',
};

// Search bar

// This limits the results in the API request
export const SEARCH_BAR_WQL_VALUE_SUGGESTIONS_COUNT = 30;
// This limits the suggestions for the token of type value displayed in the search bar
export const SEARCH_BAR_WQL_VALUE_SUGGESTIONS_DISPLAY_COUNT = 10;
/* Time in milliseconds to debounce the analysis of search bar. This mitigates some problems related
to changes running in parallel */
export const SEARCH_BAR_DEBOUNCE_UPDATE_TIME = 400;

// ID used to refer the createOsdUrlStateStorage state
export const OSD_URL_STATE_STORAGE_ID = 'state:storeInSessionStorage';
