describe('Side Menu -- ', () => {
  beforeEach(() => {
    cy.viewport(375, 812);
    cy.login();
    cy.getByTestId('navHeader-logo').invoke('attr', 'src').should('contain', 'FREEDOM_CHURCH.png');
    cy.openSideMenu();
  });

  it('Has all expected elements', () => {
    cy.getByTestId('side-menu').within($sideMenu => { /* eslint-disable-line no-unused-vars */
      cy.contains('Freedom Church');
      cy.contains('Staging Event 24/7');
      cy.contains(/^T$/);
      cy.contains('Tester Joe');
      cy.contains('button', 'Log Out');
      cy.getByTestId('languageSelector-select');
      cy.get('label').invoke('attr', 'for').should('contain', 'checkbox');
      cy.contains('a', 'Guest experience');
      cy.contains('a', 'Admin');
      cy.contains('a', 'Support');
      cy.contains('a', 'Give feedback');
    });
    cy.closeSideMenu();
    cy.getByTestId('navHeader-logo').invoke('attr', 'src').should('contain', 'FREEDOM_CHURCH.png');
  });

  it('Logout Redirects to logout page', () => {
    cy.contains('button', 'Log Out').click();
    cy.location('pathname').should('eq', '/sessions/sign_out');
  });

  it('Guest Experiance Redirects to guest experiance page', () => {
    cy.contains('a', 'Guest experience').click();
    cy.location('pathname').should('eq', '/guest_experience');
  });

  it('Admin Redirects to admin page', () => {
    cy.contains('a', 'Admin').click();
    cy.location('pathname').should('eq', '/admin');
  });

  it('Support Redirects to support page', () => {
    cy.contains('a', 'Support')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href', 'https://support.churchonlineplatform.com/en/category/host-mobile-hn92o9');
  });

  it('Give Feedback Redirects to give feedback page', () => {
    cy.contains('a', 'Give feedback')
      .should('have.attr', 'target', '_blank')
      .should('have.attr', 'href', 'https://lifechurch.formstack.com/forms/host_feedback_2');
  });

  it('Test Comfy and Compact', () => {
    cy.get('#checkbox').then($checkbox => {
      if ($checkbox.prop('checked')) {
        cy.get('label[for=checkbox]').click();
        cy.notificationText('Chat size decreased.');
        cy.dissmissNotification();
        cy.closeSideMenu();
        cy.getByTestId('messageContainer')
          .children().first()
          .children().first()
          .should('have.css', 'min-height', '24px');
        cy.openSideMenu();
        cy.get('label[for=checkbox]').click();
        cy.notificationText('Chat size increased.');
        cy.dissmissNotification();
        cy.closeSideMenu();
        cy.getByTestId('messageContainer')
          .children().first()
          .children().first()
          .should('have.css', 'min-height', '40px');
      } else {
        cy.get('label[for=checkbox]').click();
        cy.notificationText('Chat size increased.');
        cy.dissmissNotification();
        cy.closeSideMenu();
        cy.getByTestId('messageContainer')
          .children().first()
          .children().first()
          .should('have.css', 'min-height', '40px');
        cy.openSideMenu();
        cy.get('label[for=checkbox]').click();
        cy.notificationText('Chat size decreased.');
        cy.dissmissNotification();
        cy.closeSideMenu();
        cy.getByTestId('messageContainer')
          .children().first()
          .children().first()
          .should('have.css', 'min-height', '24px');
      }
    });
  });
});
