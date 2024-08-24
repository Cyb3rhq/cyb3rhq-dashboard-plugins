import { NoInstallCommandDefinitionException, NoPackageURLDefinitionException, Cyb3rhqVersionUndefinedException } from "../exceptions";
import { IOSCommandsDefinition, IOperationSystem, IOptionalParameters } from "../types";

/**
 * Returns the installation command for a given operating system.
 * @param {IOSCommandsDefinition<OS, Param>} osDefinition - The definition of the operating system.
 * @param {string} packageUrl - The URL of the package to install.
 * @param {string} version - The version of Cyb3rhq to install.
 * @param {string} osName - The name of the operating system.
 * @param {IOptionalParameters<T>} [optionals] - Optional parameters to include in the command.
 * @returns {string} The installation command for the given operating system.
 * @throws {NoInstallCommandDefinitionException} If the installation command is not defined for the given operating system.
 * @throws {NoPackageURLDefinitionException} If the package URL is not defined.
 * @throws {Cyb3rhqVersionUndefinedException} If the Cyb3rhq version is not defined.
 */
export function getInstallCommandByOS<OS extends IOperationSystem, Params extends string>(osDefinition: IOSCommandsDefinition<OS, Params>, packageUrl: string, version: string, osName: string, optionals?: IOptionalParameters<Params>) {
    
    if (!osDefinition.installCommand) {
        throw new NoInstallCommandDefinitionException(osName, osDefinition.architecture);
      }
  
      if(!packageUrl || packageUrl === ''){
          throw new NoPackageURLDefinitionException(osName, osDefinition.architecture);
      }

    if(!version || version === ''){
        throw new Cyb3rhqVersionUndefinedException();
    }
    
    return osDefinition.installCommand({
        urlPackage: packageUrl,
        cyb3rhqVersion: version,
        name: osName as OS['name'],
        architecture: osDefinition.architecture,
        optionals,
    });
}