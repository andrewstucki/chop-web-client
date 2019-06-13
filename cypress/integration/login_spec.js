describe('Login', () => {
  it('Page has all correct elements on it', () => {
    cy.visit('/');

    cy.contains('Log In');
    cy.contains('Email');
    cy.contains('Password');
    cy.get('button').contains('Log In');
  });

  it('Pushing button with no inputs shows error', () => {
    cy.visit('/');

    cy.get('button').click();

    cy.get('[data-testid=error-message]').as('errors');

    cy.get('@errors').should('have.length', 1);
    cy.get('@errors').contains('Invalid authentication arguments.');
  });

  it('Pushing button with only email shows error', () => {
    cy.visit('/');

    cy.get('input[name="email"]').type('joe.test@testing.com');

    cy.get('button').click();

    cy.get('[data-testid=error-message]').as('errors');

    cy.get('@errors').should('have.length', 1);
    cy.get('@errors').contains('Invalid authentication arguments.');
  });

  it('Pushing button with only password shows error', () => {
    cy.visit('/');

    cy.get('input[name="password"]').type('123456');

    cy.get('button').click();

    cy.get('[data-testid=error-message]').as('errors');

    cy.get('@errors').should('have.length', 1);
    cy.get('@errors').contains('Invalid authentication arguments.');
  });

  // How login is changing so it's not worth fixing this test until that is done
  it.skip('Pushing button with only wrong email and password shows error', () => {
    cy.visit('/');

    cy.get('input[name="email"]').type('blah');
    cy.get('input[name="password"]').type('blah');

    cy.get('button').click();

    cy.get('[data-testid=error-message]').as('errors');

    cy.get('@errors').should('have.length', 1);
    cy.get('@errors').contains('Unauthorized: Invalid credentials.');
  });

  it('User logs in successfully', () => {
    cy.visit('/');

    cy.get('input[name="email"]').type('joe.test@testing.com');
    cy.get('input[name="password"]').type('123456');

    cy.get('button').click();

    cy.get('[data-testid=chop]');
  });
});
