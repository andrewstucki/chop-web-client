describe('NavBar', () => {
  beforeEach(() => {
    cy.login();
  });

  it('has all correct elements on it', () => {
    cy.viewport('iphone-6');
    cy.get('[data-testid=navbar]').as('navbar');
    cy.get('[data-testid=navbar]>button>svg');
    cy.get('@navbar').contains('Public');
    cy.get('@navbar').contains('Host');
  });

  it('changes channels', () => {
    cy.viewport('iphone-6');
    cy.get('[data-testid=navbar]').as('navbar');
    cy.get('@navbar').contains('Public').as('public');
    cy.get('@navbar').contains('Host').as('host');
    // TODO: Better way of detecting selected other than color
    cy.get('@public').should('have.css', 'color').and('equal', 'rgb(64, 64, 65)');
    cy.get('@host').should('have.css', 'color').and('equal', 'rgb(159, 159, 160)');
    cy.get('@host').click();
    cy.get('@public').should('have.css', 'color').and('equal', 'rgb(159, 159, 160)');
    cy.get('@host').should('have.css', 'color').and('equal', 'rgb(64, 64, 65)');
  });

  it('scrolls sideways', () => {
    cy.viewport('iphone-6');
    cy.get('[data-testid=navbarItems]').then($el => {
      expect(Cypress.dom.isScrollable($el)).to.be.false;
    });
    cy.get('[data-testid=navbar]>button').click();
    cy.contains('host info').click();
    cy.viewport(150, 400); // Make the viewport very narrow so we will have scrolling in the Nav Bar
    cy.get('[data-testid=navbarItems]').then($el => {
      expect(Cypress.dom.isScrollable($el)).to.be.true;
    });
  });
});