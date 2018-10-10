// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import actorMiddleware from '../../../src/middleware/actor-middleware';
import SequenceActor from '../../../src/io/sequence';
import GraphQlActor from '../../../src/io/graph';
import reducer from '../../../src/chop/dux';
import SideMenu from '../../../src/sideMenu';
import { mockFetch, mockGraph } from 'graphql.js';
import testData from './test-data.json';
import accessToken from './access-token.json';

Enzyme.configure({ adapter: new Adapter() });

describe('Session', () => {
  test('Startup application', async () => {
    global.document.cookie  = 'legacy_token=12345; ';
    jest.mock('graphql.js');
    mockFetch.mockResolvedValueOnce(accessToken);
    mockFetch.mockResolvedValueOnce(testData);

    const actorMiddlewareApplied = actorMiddleware(
      SequenceActor,
      GraphQlActor,
    );
    
    const store = createStore(
      reducer,
      compose(
        applyMiddleware(actorMiddlewareApplied)
      )
    );
    
    // await for both stages of starting up application
    await await store.dispatch({ type: 'INIT' });

    expect(mockGraph).toHaveBeenCalledTimes(2);
    expect(mockGraph.mock.calls[1][0]).toBe(
      `
          {
            currentEvent {
              title
              eventTimeId
              eventStartTime
              eventTimezone
              video {
                type
                url
              }
            }
            currentUser {
              id
              nickname
              avatar
              pubnubToken
              role {
                label
              }
            }
            currentFeeds {
              id
              name
              type
            }
            currentOrganization {
              id
              name
            }
            pubnubKeys {
              publishKey
              subscribeKey
            }
            currentLanguages {
              name
              code
            }
          }
        `
    );
    expect(mockGraph.mock.calls[0][0]).toBe(
      `
        mutation AccessToken($token: String!) {
          authenticate(type: "LegacyAuth", legacy_token: $token) {
            access_token
          }
        }
      `
    );

    expect(store.getState().feed.currentUser).toEqual(
      {
        avatar: null,
        id: 123456,
        name: 'Tony Hoare',
        pubnubAccessKey: 'abc123xyz',
        pubnubToken: 'abc123xyz',
        role: {
          label: 'host',
          permissions: [],
        },
      }
    );
  });
  
  test('logout', () => {
    global.location.assign = jest.fn();

    const store = createStore(reducer);

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <SideMenu />
      </Provider>
    );

    wrapper.find('#logout').simulate('click');
    expect(global.location.assign).toHaveBeenCalledTimes(1);
    expect(global.location.assign).toHaveBeenCalledWith('https://live.life.church/sessions/sign_out');
  });
});