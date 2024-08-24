import { When } from 'cypress-cucumber-preprocessor/steps';
import { clickElement, elementIsVisible, getSelector } from '../../../utils/driver';
import { CYB3RHQ_MENU_PAGE as pageName} from '../../../utils/pages-constants';
const decodersLink = getSelector('decodersLink', pageName);
const cyb3rhqMenuButton = getSelector('cyb3rhqMenuButton', pageName);
const managementButton = getSelector('managementButton', pageName);

When('The user navigates to decoders', () => {
  elementIsVisible(cyb3rhqMenuButton);
  clickElement(cyb3rhqMenuButton);
  elementIsVisible(managementButton);
  clickElement(managementButton);
  elementIsVisible(decodersLink);
  clickElement(decodersLink);
});
