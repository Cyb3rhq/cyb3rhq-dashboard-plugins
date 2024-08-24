import { When } from 'cypress-cucumber-preprocessor/steps';
import { clickElement, elementIsVisible, validateURLIncludes, getSelector } from '../../../utils/driver';
import { CYB3RHQ_MENU_PAGE as pageName} from '../../../utils/pages-constants';
const managementButton = getSelector('managementButton', pageName);
const cyb3rhqMenuButton = getSelector('cyb3rhqMenuButton', pageName);
const rulesLink = getSelector('rulesLink', pageName);

When('The user navigates to rules', () => {
  elementIsVisible(cyb3rhqMenuButton);
  clickElement(cyb3rhqMenuButton);
  elementIsVisible(managementButton);
  clickElement(managementButton);
  elementIsVisible(rulesLink);
  clickElement(rulesLink);
  validateURLIncludes('/manager/?tab=rules');
});
