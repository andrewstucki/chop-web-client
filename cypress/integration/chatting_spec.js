describe('Chatting', () => {
  it('Sending a message', () => {
    cy.server();
    cy.route('/publish/**').as('publish');

    cy.login();
    cy.get('[data-testid=chat-input]').type('Hello, world!');
    cy.get('[data-testid=chat-submit-button]').click();

    cy.wait('@publish')
      .its('url').should('match', /Hello, world!/);

    cy.get('[data-component=messageContainer]').last().as('message');
    cy.get('@message').contains('Hello, world!');
    cy.get('@message').contains('Tester Joe');
    cy.get('@message').contains('T');
    cy.get('@message').contains('Admin');
  });

  it('Receiving a message', () => {
    // TODO: Send this message in through pubnub or open another client and send it from their
    cy.window().then(win => {
      win.store.dispatch(
        {
          type: 'RECEIVE_MOMENT',
          channel: '998056925ead69f1f74047e57a8a84622db90754f9776257a80525d84860850c',
          moment: {
            type: 'MESSAGE',
            id: 'd5080509-6e0a-47f6-b48d-ff01f7f86242',
            timestamp: 1552583185000,
            lang: 'en',
            text: 'Goodnight, moon!',
            translations: [],
            isMuted: false,
            closeTrayButtonRendered: false,
            messageTrayOpen: false,
            sender: {
              id: 1074240,
              name: 'Tester Steve',
              avatarUrl: 'https://s3.amazonaws.com/chop-v3-media/users/avatars/thumb/missing.png',
              pubnubToken: 'e2a0e2591ec85bf780011426349768f84252361b8c64037eef0cc5c5bbe81017',
              role: {
                label: '',
              },
            },
          },
        }
      );
    });

    cy.get('[data-component=messageContainer]').last().as('message');
    cy.get('@message').contains('Goodnight, moon!');
    cy.get('@message').contains('Tester Steve');
    cy.get('@message').contains('T');
  });
});