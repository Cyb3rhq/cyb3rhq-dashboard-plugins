import { clickElement, elementIsNotVisible, elementIsVisible, getSelector } from '../../../utils/driver';
import { CYB3RHQ_MENU_PAGE as pageName, MODULES_CARDS } from '../../../utils/pages-constants';
const modulesButton = getSelector('modulesButton', pageName);
const modulesDirectoryLink = getSelector('modulesDirectoryLink', pageName);
const cyb3rhqMenuButton = getSelector('cyb3rhqMenuButton', pageName);
const cyb3rhqMenuLeft = getSelector('cyb3rhqMenuLeft', pageName);
const cyb3rhqMenuRight = getSelector('cyb3rhqMenuRight', pageName);
const cyb3rhqMenuSettingRight = getSelector('cyb3rhqMenuSettingRight', pageName);

Then('The deactivated modules with {} are not displayed on home page', (moduleName) => {
  elementIsVisible(cyb3rhqMenuButton);
  clickElement(cyb3rhqMenuButton);
  elementIsVisible(cyb3rhqMenuLeft);
  elementIsVisible(cyb3rhqMenuRight);
  elementIsVisible(modulesButton);
  clickElement(modulesButton);
  cy.wait(1000)
  elementIsVisible(cyb3rhqMenuSettingRight);
  elementIsVisible(modulesDirectoryLink);
  clickElement(modulesDirectoryLink);
  cy.get('react-component[name="OverviewWelcome"]', { timeout: 15000 });
  elementIsNotVisible(getSelector(moduleName, MODULES_CARDS));
});
