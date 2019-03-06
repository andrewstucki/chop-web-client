describe('Chat', () => {
  it('Adds a new message', () => {
    cy.visit('/');

    cy.get('input[name="email"]').type('joe.test@testing.com');
    cy.get('input[name="password"]').type('123456');

    cy.get('button').click();

    cy.get('[data-testid="navbar"]').should('exist');
  });
});
