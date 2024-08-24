import { When } from 'cypress-cucumber-preprocessor/steps';
import { xpathElementIsVisible, forceClickElementByXpath, getSelector, forceClickElement, elementIsVisible} from '../../utils/driver';

import { BASIC_MODULES} from '../../utils/pages-constants';
import { CYB3RHQ_MENU_PAGE as pageName} from '../../utils/pages-constants';
const cyb3rhqMenuButton = getSelector('cyb3rhqMenuButton', pageName);
When('The user goes to {}', (moduleName) => {
  
  cy.wait(500);
  elementIsVisible(cyb3rhqMenuButton);
  cy.wait(500);
  forceClickElement(cyb3rhqMenuButton);
  xpathElementIsVisible(getSelector(moduleName, BASIC_MODULES));
  forceClickElementByXpath(getSelector(moduleName, BASIC_MODULES));
});
