import { When } from 'cypress-cucumber-preprocessor/steps';
import { clickElement, elementIsVisible, getSelector } from '../../../utils/driver';
import { CYB3RHQ_MENU_PAGE as pageName} from '../../../utils/pages-constants';
const groupsLink = getSelector('groupsLink', pageName);
const cyb3rhqMenuButton = getSelector('cyb3rhqMenuButton', pageName);
const managementButton = getSelector('managementButton', pageName);

When('The user navigates to groups page', () => {
  elementIsVisible(cyb3rhqMenuButton);
  clickElement(cyb3rhqMenuButton);
  elementIsVisible(managementButton);
  clickElement(managementButton);
  elementIsVisible(groupsLink);
  clickElement(groupsLink);
});
