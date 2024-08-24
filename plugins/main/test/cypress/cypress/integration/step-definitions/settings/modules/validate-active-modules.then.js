import { clickElement, elementIsVisible, getSelector } from '../../../utils/driver';
import { CYB3RHQ_MENU_PAGE as pageName, MODULES_CARDS } from '../../../utils/pages-constants';
const modulesButton = getSelector('modulesButton', pageName);
const modulesDirectoryLink = getSelector('modulesDirectoryLink', pageName);
const cyb3rhqMenuButton = getSelector('cyb3rhqMenuButton', pageName);
const cyb3rhqMenuLeft = getSelector('cyb3rhqMenuLeft', pageName);
const cyb3rhqMenuRight = getSelector('cyb3rhqMenuRight', pageName);
const cyb3rhqMenuSettingRight = getSelector('cyb3rhqMenuSettingRight', pageName);

Then('The activated modules with {} are displayed on home page', (moduleName) => {
  elementIsVisible(cyb3rhqMenuButton);
  clickElement(cyb3rhqMenuButton);
  elementIsVisible(cyb3rhqMenuLeft);
  elementIsVisible(cyb3rhqMenuRight);
  elementIsVisible(modulesButton);
  clickElement(modulesButton);
  elementIsVisible(cyb3rhqMenuSettingRight);
  elementIsVisible(modulesDirectoryLink);
  clickElement(modulesDirectoryLink);
  elementIsVisible(getSelector(moduleName, MODULES_CARDS));
});
