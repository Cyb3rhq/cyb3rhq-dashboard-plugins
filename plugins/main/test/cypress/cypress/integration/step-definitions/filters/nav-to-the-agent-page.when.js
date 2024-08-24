import { When } from 'cypress-cucumber-preprocessor/steps';
import { clickElement, elementIsVisible, getSelector} from '../../utils/driver';

import { CYB3RHQ_MENU_PAGE as pageName} from '../../utils/pages-constants';
const cyb3rhqMenuButton = getSelector('cyb3rhqMenuButton', pageName);
const agentsButton = getSelector('agentsButton', pageName);

When('The user navigates to the agent page', () => {
  clickElement(cyb3rhqMenuButton);
  elementIsVisible(agentsButton);
  clickElement(agentsButton);
});
