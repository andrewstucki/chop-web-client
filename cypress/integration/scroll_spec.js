describe('Feed scrolling', () => {
  // Cypress.Commands.add('visitGraphQL', (url, operations = {}) => {
  //   cy.visit(url, {
  //     onBeforeLoad: (win) => {
  //       cy.stub(win, 'fetch').callsFake(serverStub);
  //     }
  //   });

  //   function serverStub(path, req) {
  //     const { operationName } = JSON.parse(req);

  //     if (operationName in operations) {
  //       return Promise.resolve(responseStub(operations[operationName]));
  //     }

  //     return Promise.reject(new Error(`Not found: ${path}`));
  //   }

  //   function responseStub(result) {
  //     return {
  //       json() {
  //         return Promise.resolve(result);
  //       },
  //       text() {
  //         return Promise.resolve(JSON.stringify(result));
  //       },
  //       ok: true,
  //     }
  //   }
  // });

  // beforeEach(() => {
  //   cy.server();

  //   cy.fixture('currnetEvent.json').as('currentEvent');

  //   cy.visitGraphQL('/graphql', {
  //     CurrentEvent: cy.get('@currentEvent')
  //   })
  // })

  function loadAppWithHistory() {

    cy.server();

    cy.fixture('pubnubHistory.json').as('pubnubHistoryJSON');

    cy.route(/.*\/publish\/.*/, [1, "Sent", "15474147248048901"]);

    cy.route(/.*\/history\/.*/, '@pubnubHistoryJSON');

    cy.visit('http://0.0.0.0:8080');
    cy
      .window()
      .its('store')
      .invoke('dispatch', {
        type: 'SET_AUTHENTICATION',
        auth: {
          accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1NDc5ODcxOTMsInVzZXJfaWQiOjU1MCwiaWF0IjoxNTQ3MzgyMzkzfQ.-N90sYwfPVhAf2VgL6V9LwJrwHZBiZ9GxIvNv3v2Z9g',
          refreshToken: '599d04de-e8cf-4379-b0ab-13e985200138'
        }
      });

    cy
      .window()
      .its('store')
      .invoke('dispatch', {
        type: 'SET_PUBNUB_KEYS',
        publish: 'pub-c-5d166bf0-07cf-4e5b-81e6-797b7f01bf83',
        subscribe: 'sub-c-12f3b1fe-e04d-11e7-b7e7-02872c090099'
      });

    cy
      .window()
      .its('store')
      .invoke('dispatch', {
        type: 'SET_USER',
        user: {
          id: 1022905,
          name: 'G. Boole',
          avatar: 'https://chop-v3-media.s3.amazonaws.com/users/avatars/1022905/thumb/photo.jpg',
          pubnubToken: 'f2211608e7c78001db3a7674dc4d98194586e491fd0e117709b4d8df607c9a3c',
          role: {
            label: 'Admin',
            permissions: []
          }
        }
      });

    cy
      .window()
      .its('store')
      .invoke('dispatch', {
        type: 'SET_EVENT',
        event: {
          title: 'Fake Event',
          id: '1',
          startTime: '0',
          videoStartTime: '0',
        },
      });

    cy
      .window()
      .its('store')
      .invoke('dispatch', {
        type: 'ADD_CHANNEL',
        channel: {
          id: '998056925ead69f1f74047e57a8a84622db90754f9776257a80525d84860850c',
          name: 'Public',
          direct: false,
          moments: [],
          participants: [],
          anchorMoments: [],
          scrollPosition: 0,
          sawLastMomentAt: Date.now(),
        },
      });

    cy
      .window()
      .its('store')
      .invoke('dispatch', {
        type: 'SET_PANE_CONTENT',
        name: 'primary',
        content: {
          type: 'EVENT',
          channelId: '998056925ead69f1f74047e57a8a84622db90754f9776257a80525d84860850c'
        }
      });
  }

  it('shows the most recent message when history loads.', () => {
    loadAppWithHistory();

    cy.get('[data-component=feed] li:last-child').should('be.visible')
  });

  it('shows the newest message when a new message comes in if we are already scrolled to the most recent.', () => {
    loadAppWithHistory();

    cy.get('[data-component=feed] ul span').children().should('have.length', 12)

    cy
      .window()
      .its('store')
      .invoke('dispatch', {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: '998056925ead69f1f74047e57a8a84622db90754f9776257a80525d84860850c',
        moment: {
          type: 'MESSAGE',
          id: 'db3d0f79-824d-4e46-94d5-0aedca429b9e',
          timestamp: 1547486695817,
          lang: 'en',
          text: 'This is a new message',
          sender: {
            id: 1022905,
            pubnubToken: 'f2211608e7c78001db3a7674dc4d98194586e491fd0e117709b4d8df607c9a3c',
            name: 'G. Boole',
            avatarUrl: 'https://chop-v3-media.s3.amazonaws.com/users/avatars/1022905/thumb/photo.jpg',
            role: {
              label: 'Admin'
            }
          },
          messageTrayOpen: false,
          closeTrayButtonRendered: false
        }
      });

    cy.get('[data-component=feed] ul>span').children().as('feedList');
    cy.get('@feedList').last().should('be.visible');
    cy.get('@feedList').last().contains('This is a new message');
  });

  it('does not shows the newest message when a new message comes in if we are scrolled up in the feed.', () => {
    loadAppWithHistory();

    cy.get('[data-component=feed] ul span').children().should('have.length', 12)

    cy.get('[data-component=feed]').scrollTo(0,100);


    cy.window().then($window => {
      expect($window.document.querySelector('[data-component=feed]').scrollTop).to.equal(100);
    })
    cy.wait(50);
    cy
      .window()
      .its('store')
      .invoke('dispatch', {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: '998056925ead69f1f74047e57a8a84622db90754f9776257a80525d84860850c',
        moment: {
          type: 'MESSAGE',
          id: 'db3d0f79-824d-4e46-94d5-0aedca429b9e',
          timestamp: 1547486695817,
          lang: 'en',
          text: 'This is a new message',
          sender: {
            id: 1022906,
            pubnubToken: 'f2211608e7c78001db3a7674dc4d98194586e491fd0e117709b4d8df607c9a3',
            name: 'Other User',
            avatarUrl: null,
            role: {
              label: ''
            }
          },
          messageTrayOpen: false,
          closeTrayButtonRendered: false
        }
      });

      cy.window().then($window => {
        expect($window.document.querySelector('[data-component=feed]').scrollTop).to.equal(100);
      })
  });

  it('shows the newest message when the user sends new message comes in if we are scrolled up in the feed.', () => {
    loadAppWithHistory();

    cy.get('[data-component=feed] ul span').children().should('have.length', 12)

    cy.get('[data-component=feed]').scrollTo(0,100);


    cy.window().then($window => {
      expect($window.document.querySelector('[data-component=feed]').scrollTop).to.equal(100);
    })
    cy.wait(50);
    cy
      .window()
      .its('store')
      .invoke('dispatch', {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: '998056925ead69f1f74047e57a8a84622db90754f9776257a80525d84860850c',
        moment: {
          type: 'MESSAGE',
          id: 'db3d0f79-824d-4e46-94d5-0aedca429b9e',
          timestamp: 1547486695817,
          lang: 'en',
          text: 'This is a new message',
          sender: {
            id: 1022905,
            pubnubToken: 'f2211608e7c78001db3a7674dc4d98194586e491fd0e117709b4d8df607c9a3c',
            name: 'G. Boole',
            avatarUrl: 'https://chop-v3-media.s3.amazonaws.com/users/avatars/1022905/thumb/photo.jpg',
            role: {
              label: 'Admin'
            }
          },
          messageTrayOpen: false,
          closeTrayButtonRendered: false
        }
      });

      cy.window().then($window => {
        expect($window.document.querySelector('[data-component=feed]').scrollTop).to.equal(182);
      })
  });
});