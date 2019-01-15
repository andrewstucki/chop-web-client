describe('Feed scrolling', () => {


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

  

  it('does not shows the newest message when a new message comes in if we are scrolled up in the feed.', () => {
    loadAppWithHistory();

    cy.get('[data-component=feed]').scrollTo('top');
    cy.pause()
    cy.get('[data-component=feed]').scrollTo('bottom');
    cy.pause()
    cy.get('[data-component=feed]').scrollTo(0,100);
    cy.pause()
    cy.get('[data-component=feed]').scrollTo(0,0);
    cy.pause()
    cy.get('[data-component=feed]').scrollTo(0,100);
    cy.pause()
  });
   
});