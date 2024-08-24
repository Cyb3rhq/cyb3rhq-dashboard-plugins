import { tOptionalParameters } from '../core/config/os-commands-definitions';
import {
  IOptionalParameters,
  tOSEntryInstallCommand,
  tOSEntryProps,
} from '../core/register-commands/types';
import { tOperatingSystem } from '../hooks/use-register-agent-commands.test';

export const getAllOptionals = (
  optionals: IOptionalParameters<tOptionalParameters>,
  osName?: tOperatingSystem['name'],
) => {
  // create paramNameOrderList, which is an array of the keys of optionals add interface
  const paramNameOrderList: (keyof IOptionalParameters<tOptionalParameters>)[] =
    ['serverAddress', 'cyb3rhqPassword', 'agentGroups', 'agentName', 'protocol'];

  if (!optionals) return '';
  let paramsText = Object.entries(paramNameOrderList).reduce(
    (acc, [key, value]) => {
      if (optionals[value]) {
        acc += `${optionals[value]} `;
      }
      return acc;
    },
    '',
  );

  return paramsText;
};

export const getAllOptionalsMacos = (
  optionals: IOptionalParameters<tOptionalParameters>,
) => {
  // create paramNameOrderList, which is an array of the keys of optionals add interface
  const paramNameOrderList: (keyof IOptionalParameters<tOptionalParameters>)[] =
    ['serverAddress', 'agentGroups', 'agentName', 'protocol', 'cyb3rhqPassword'];

  if (!optionals) return '';

  const paramsValueList = [];

  paramNameOrderList.forEach(paramName => {
    if (optionals[paramName] && optionals[paramName] !== '') {
      paramsValueList.push(optionals[paramName]);
    }
  });

  if (paramsValueList.length) {
    return paramsValueList.join(' && ');
  }

  return '';
};

/******* DEB *******/

export const getDEBAMD64InstallCommand = (
  props: tOSEntryInstallCommand<tOptionalParameters>,
) => {
  const { optionals, urlPackage, cyb3rhqVersion } = props;
  const packageName = `cyb3rhq-agent_${cyb3rhqVersion}-1_amd64.deb`;
  return `wget ${urlPackage} && sudo ${
    optionals && getAllOptionals(optionals)
  }dpkg -i ./${packageName}`;
};

export const getDEBARM64InstallCommand = (
  props: tOSEntryInstallCommand<tOptionalParameters>,
) => {
  const { optionals, urlPackage, cyb3rhqVersion } = props;
  const packageName = `cyb3rhq-agent_${cyb3rhqVersion}-1_arm64.deb`;
  return `wget ${urlPackage} && sudo ${
    optionals && getAllOptionals(optionals)
  }dpkg -i ./${packageName}`;
};

/******* RPM *******/

export const getRPMAMD64InstallCommand = (
  props: tOSEntryInstallCommand<tOptionalParameters>,
) => {
  const { optionals, urlPackage, cyb3rhqVersion, architecture } = props;
  const packageName = `cyb3rhq-agent-${cyb3rhqVersion}-1.x86_64.rpm`;
  return `curl -o ${packageName} ${urlPackage} && sudo ${
    optionals && getAllOptionals(optionals)
  }rpm -ihv ${packageName}`;
};

export const getRPMARM64InstallCommand = (
  props: tOSEntryInstallCommand<tOptionalParameters>,
) => {
  const { optionals, urlPackage, cyb3rhqVersion, architecture } = props;
  const packageName = `cyb3rhq-agent-${cyb3rhqVersion}-1.aarch64.rpm`;
  return `curl -o ${packageName} ${urlPackage} && sudo ${
    optionals && getAllOptionals(optionals)
  }rpm -ihv ${packageName}`;
};

/******* Linux *******/

// Start command
export const getLinuxStartCommand = (
  _props: tOSEntryProps<tOptionalParameters>,
) => {
  return `sudo systemctl daemon-reload\nsudo systemctl enable cyb3rhq-agent\nsudo systemctl start cyb3rhq-agent`;
};

/******** Windows ********/

export const getWindowsInstallCommand = (
  props: tOSEntryInstallCommand<tOptionalParameters>,
) => {
  const { optionals, urlPackage, name } = props;
  return `Invoke-WebRequest -Uri ${urlPackage} -OutFile \$env:tmp\\cyb3rhq-agent; msiexec.exe /i \$env:tmp\\cyb3rhq-agent /q ${
    optionals && getAllOptionals(optionals, name)
  }`;
};

export const getWindowsStartCommand = (
  _props: tOSEntryProps<tOptionalParameters>,
) => {
  return `NET START Cyb3rhqSvc`;
};

/******** MacOS ********/

export const transformOptionalsParamatersMacOSCommand = (command: string) => {
  return command
    .replace(/\' ([a-zA-Z])/g, "' && $1") // Separate environment variables with &&
    .replace(/\"/g, '\\"') // Escape double quotes
    .trim();
};

export const getMacOsInstallCommand = (
  props: tOSEntryInstallCommand<tOptionalParameters>,
) => {
  const { optionals, urlPackage } = props;

  let optionalsForCommand = { ...optionals };
  if (optionalsForCommand?.cyb3rhqPassword) {
    /**
     * We use the JSON.stringify to prevent that the scaped specials characters will be removed
     * and maintain the format of the password
      The JSON.stringify maintain the password format but adds " to wrap the characters
    */
    const scapedPasswordLength = JSON.stringify(
      optionalsForCommand?.cyb3rhqPassword,
    ).length;
    // We need to remove the " added by JSON.stringify
    optionalsForCommand.cyb3rhqPassword = `${JSON.stringify(
      optionalsForCommand?.cyb3rhqPassword,
    ).substring(1, scapedPasswordLength - 1)}`;
  }

  // Set macOS installation script with environment variables
  const optionalsText =
    optionalsForCommand && getAllOptionalsMacos(optionalsForCommand);
  const macOSInstallationOptions = transformOptionalsParamatersMacOSCommand(
    optionalsText || '',
  );

  // If no variables are set, the echo will be empty
  const macOSInstallationSetEnvVariablesScript = macOSInstallationOptions
    ? `echo "${macOSInstallationOptions}" > /tmp/cyb3rhq_envs && `
    : ``;

  // Merge environment variables with installation script
  const macOSInstallationScript = `curl -so cyb3rhq-agent.pkg ${urlPackage} && ${macOSInstallationSetEnvVariablesScript}sudo installer -pkg ./cyb3rhq-agent.pkg -target /`;
  return macOSInstallationScript;
};

export const getMacosStartCommand = (
  _props: tOSEntryProps<tOptionalParameters>,
) => {
  return `sudo /Library/Ossec/bin/cyb3rhq-control start`;
};
