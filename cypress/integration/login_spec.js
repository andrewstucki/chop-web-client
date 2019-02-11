describe('Chat', () => {
  it('Adds a new message', () => {
    cy.visit('/');

    cy.get('#email').type('joe.test@testing.com');
    cy.get('#password').type('123456');

    cy.get('#login').click();

    cy.get('#nav-bar').should('exist');
  })
})