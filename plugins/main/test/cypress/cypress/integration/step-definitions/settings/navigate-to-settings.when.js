import { When } from 'cypress-cucumber-preprocessor/steps';
import { clickElement, elementIsVisible, getSelector } from '../../utils/driver';
import { CYB3RHQ_MENU_PAGE as pageName, SETTINGS_MENU_LINKS } from '../../utils/pages-constants';
const settingsButton = getSelector('settingsButton', pageName);
const cyb3rhqMenuButton = getSelector('cyb3rhqMenuButton', pageName);
const cyb3rhqMenuLeft = getSelector('cyb3rhqMenuLeft', pageName);
const cyb3rhqMenuRight = getSelector('cyb3rhqMenuRight', pageName);
const cyb3rhqMenuSettingRight = getSelector('cyb3rhqMenuSettingRight', pageName);

When('The user navigates to {} settings', (menuOption) => {
  elementIsVisible(cyb3rhqMenuButton);
  clickElement(cyb3rhqMenuButton);
  elementIsVisible(cyb3rhqMenuLeft);
  elementIsVisible(cyb3rhqMenuRight);
  elementIsVisible(settingsButton);
  clickElement(settingsButton);
  elementIsVisible(cyb3rhqMenuSettingRight);
  if (Cypress.env('type') == 'wzd') {
    cy.wait(1000);
    elementIsVisible(getSelector(menuOption, SETTINGS_MENU_LINKS)).click()
  } else {
    elementIsVisible(getSelector(menuOption, SETTINGS_MENU_LINKS));
    clickElement(getSelector(menuOption, SETTINGS_MENU_LINKS));
  };
});
