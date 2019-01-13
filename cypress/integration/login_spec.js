describe('Chat', () => {
  it('Adds a new message', () => {
    cy.visit('http://0.0.0.0:8080');

    cy.get('#email').type('joe.test@testing.com');
    cy.get('#password').type('123456');

    cy.get('#login').click();

    cy.get('#nav-bar').should('exist');
  })
})