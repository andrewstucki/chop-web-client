describe('scrolling', () => {
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

  it('something', () => {
    cy.server()

    cy.fixture('currentEvent.json').as('currentEventJSON')
    cy.route('/.*\/graphql\/.*/', '@currentEventJSON')

    cy.route(/.*\/publish\/.*/, [1,"Sent","15474147248048901"]);

    cy.route(/.*\/history\/.*/, [[],0,0]);

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
          id: 366,
          name: 'Olson_Mathilde',
          avatar: null,
          pubnubToken: '861c6066-f96c-4a94-8456-59c4aacd371d',
          role: {
            label: 'Host',
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
          id: 'dbc0ca00-1015-46a3-9118-5548787f5c0a',
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
          channelId: 'dbc0ca00-1015-46a3-9118-5548787f5c0a'
        }
      });

    for (let i = 0; i <= 12; i ++) {
      cy
      .window()
      .its('store')
      .invoke('dispatch', {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'dbc0ca00-1015-46a3-9118-5548787f5c0a',
        moment: {
          type: 'MESSAGE',
          id: 'bb884cc9-bf32-495b-bb52-75b2e6285768' + i,
          timestamp: 1547416607573,
          lang: 'en',
          text: 'hi',
          sender: {
            id: 366,
            pubnubToken: '861c6066-f96c-4a94-8456-59c4aacd371d',
            name: 'Olson_Mathilde',
            role: {
              label: 'Host'
            }
          },
          messageTrayOpen: false,
          closeTrayButtonRendered: false
        }
      });
    }

    cy.get('[data-component=feed] li:last-child').should('be.visible') 
  })
})