import { When } from 'cypress-cucumber-preprocessor/steps';
import { clickElement, elementIsVisible, getSelector} from '../../utils/driver';
import { CYB3RHQ_MENU_PAGE as pageName} from '../../utils/pages-constants';
const cyb3rhqMenuButton = getSelector('cyb3rhqMenuButton', pageName);
const modulesDirectoryLink = getSelector('modulesDirectoryLink', pageName);
const modulesButton = getSelector('modulesButton', pageName);

When('The user navigates overview page', () => {
  elementIsVisible(cyb3rhqMenuButton);
  clickElement(cyb3rhqMenuButton);
  elementIsVisible(modulesButton);
  clickElement(modulesButton);
  elementIsVisible(modulesDirectoryLink);
  clickElement(modulesDirectoryLink);
});
