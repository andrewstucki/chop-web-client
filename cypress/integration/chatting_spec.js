describe('Chatting', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Sending a message', () => {
    cy.server();
    cy.route('/publish/**').as('publish');

    cy.get('[data-testid=chat-input]').type('Hello, world!');
    cy.get('[data-testid=chat-submit-button]').click();

    cy.wait('@publish')
      .its('url').should('match', /Hello, world!/);

    cy.get('[data-testid=messageContainer]').last().as('message');
    cy.get('@message').contains('Hello, world!');
    cy.get('@message').contains('Tester Joe');
    cy.get('@message').contains('T');
    cy.get('@message').contains('Admin');
  });

  it('Receiving a message', () => {
    cy.get('[data-testid=chat-input]'); // Make sure the state and page has loaded
    // TODO: Send this message in through pubnub or open another client and send it from their
    cy.window().then(win => {
      const { channels } = win.store.getState().feed;
      const [ channelId ] = Object.keys(win.store.getState().feed.channels).filter(key => channels[key].name === 'Public');
      win.store.dispatch(
        {
          type: 'RECEIVE_MOMENT',
          channel: channelId,
          moment: {
            type: 'MESSAGE',
            id: 'd5080509-6e0a-47f6-b48d-' + Date.now().toString(),
            timestamp: 1552583185000,
            lang: 'en',
            text: 'Goodnight, moon!',
            translations: [],
            isMuted: false,
            messageTrayOpen: false,
            sender: {
              id: 1074240,
              nickname: 'Tester Steve',
              avatar: 'https://s3.amazonaws.com/chop-v3-media/users/avatars/thumb/missing.png',
              role: {
                label: '',
              },
            },
          },
        }
      );
    });

    cy.get('[data-testid=messageContainer]').last().as('message');
    cy.get('@message').contains('Goodnight, moon!');
    cy.get('@message').contains('Tester Steve');
    cy.get('@message').contains('T');
  });
});
