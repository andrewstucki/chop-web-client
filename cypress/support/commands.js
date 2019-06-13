// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
Cypress.Commands.add('login', () => {
  cy.visit('/');
  cy.window().then(win => {
    win.store.dispatch(
      {
        type: 'BASIC_AUTH_LOGIN',
        email: 'joe.test@testing.com',
        password: 'password',
      }
    );
  });
});

Cypress.Commands.add('getByTestId', (id, options) => cy.get(`[data-testid=${id}]`, options));

Cypress.Commands.add('openSideMenu', () => {
  cy.getByTestId('navHeader-openMenu').click();
});

Cypress.Commands.add('closeSideMenu', () => {
  cy.getByTestId('chop').find('div').first().click({force: true});
});

Cypress.Commands.add('dissmissNotification', () => {
  cy.getByTestId('banner-dismiss-button').click();
});

Cypress.Commands.add('notificationText', text => {
  cy.getByTestId('banner-message').contains(text);
});
