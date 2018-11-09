import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import actorMiddleware from '../../../src/middleware/actor-middleware';
import GraphQlActor from '../../../src/io/serviceActor';
import reducer from '../../../src/chop/dux';
import { defaultState } from '../../../src/feed/dux';
import SideMenu from '../../../src/sideMenu';
import { mockAuthenticate, mockCurrentState } from '../../../src/io/graphQL';
import { mockDate } from '../../testUtils/index.js';
import '../../../src/io/location';

jest.mock('../../../src/io/graphQL');
jest.mock('../../../src/io/location');

Enzyme.configure({ adapter: new Adapter() });

describe('Session', () => {
  test('Startup application', async () => {
    mockDate(1531844800000);
    global.document.cookie  = 'legacy_token=12345; ';

    const actorMiddlewareApplied = actorMiddleware(
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

    expect(store.getState().feed).toEqual(
      {
        ...defaultState,
        event: {
          id: 334494,
          startTime: 1531864800,
          title: 'Fake Event',
        },
        schedule: [
          {
            id: 12345,
            startTime: 1531864800,
            endTime: 1531894800,
          },
          {
            id: 67890,
            startTime: 1531904800,
            endTime: 1531964800,
          },
        ],
        organization: {
          id: 3,
          name: 'Freedom Church',
        },
        currentUser: {
          avatar: null,
          id: 123456,
          name: 'Tony Hoare',
          pubnubAccessKey: 'abc123xyz',
          pubnubToken: 'abc123xyz',
          role: {
            label: 'host',
            permissions: [],
          },
        },
        pubnubKeys: {
          publish: 'pub-9b402341-30c2-459f-9bed-69fd684a5e00',
          subscribe: 'sub-5ef6daa3-9490-11e1-bef7-45383605a8b5',
        },
        video: {
          type: 'StandardEmbed',
          url: 'https://www.youtube.com/embed/bz2kN31m_S0',
        },
        channels: {
          '1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c' :{
            id: '1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c',
            name: 'Public',
            moments: [],
            participants: [],
          }, 
          a70c52181da2f13f1f8313894c6125e2cdb87f1844fc785fb87988bc4725f2bc: {
            id: 'a70c52181da2f13f1f8313894c6125e2cdb87f1844fc785fb87988bc4725f2bc',
            name: 'Host',
            moments: [],
            participants: [],
          }, 
          '4944bf368d26faf882940ee0811964cd357a37ccf468cd8ccdf25b95b0b52a28': {
            id: '4944bf368d26faf882940ee0811964cd357a37ccf468cd8ccdf25b95b0b52a28',
            name: 'Legacy',
            moments: [],
            participants: [],
          }, 
          '26a7b967c49cff813f5449271c8a1158bb430a09bf6db5847f88abf301ea9cb1': {
            id: '26a7b967c49cff813f5449271c8a1158bb430a09bf6db5847f88abf301ea9cb1',
            name: 'Personal',
            moments: [],
            participants: [],
          },
        },
        currentChannel: '1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c',
        languageOptions: [
          {
            name: 'Afrikaans',
            code: 'af',
          },
          {
            name: 'Chinese (Simplified)',

            code: 'zh',
          },
          {
            name: 'Czech',
            code: 'cs',
          },
          {
            name: 'Danish',
            code: 'da',
          },
          {
            name: 'English',
            code: 'en',
          },
          {
            name: 'French',
            code: 'fr',
          },
          {
            name: 'Japanese',
            code: 'ja',
          },
          {
            name: 'Korean',
            code: 'ko',
          },
          {
            name: 'Portuguese',
            code: 'pt',
          },
          {
            name: 'Spanish',
            code: 'es',
          },
        ],
      }
    );
    expect(mockAuthenticate).toHaveBeenCalledTimes(1);
    expect(mockAuthenticate).toHaveBeenCalledWith('12345', 'digerati.churchonline.org');
    expect(mockCurrentState).toHaveBeenCalledTimes(1);
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
