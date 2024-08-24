import { When } from 'cypress-cucumber-preprocessor/steps';
import { clickElement, elementIsVisible, getSelector} from '../../utils/driver';

import { CYB3RHQ_MENU_PAGE as pageName} from '../../utils/pages-constants';
const cyb3rhqMenuButton = getSelector('cyb3rhqMenuButton', pageName);
const managementButton = getSelector('managementButton', pageName);
const reportingLink = getSelector('reportingLink', pageName);

When('The user navigates to management-reporting', () => {
  elementIsVisible(cyb3rhqMenuButton);
  clickElement(cyb3rhqMenuButton);
  cy.wait(500);
  elementIsVisible(managementButton);
  clickElement(managementButton);
  elementIsVisible(reportingLink);
  clickElement(reportingLink);
  });
