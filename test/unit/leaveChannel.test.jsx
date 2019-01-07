// @flow
import serviceActor from '../../src/io/serviceActor';
import ChatActor from '../../src/io/chat';
import { mockFetch } from 'graphql.js';
import { mockLeaveChannel } from '../../src/io/graphQL';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState, addChannel, togglePopUpModal } from '../../src/feed/dux';
import PopUpModal from '../../src/popUpModal';
import actorMiddleware from '../../src/middleware/actor-middleware';
import testData from './io/test-data.json';
import accessToken from './io/access-token.json';
import { mockPublish, mockUnsubscribe, __messageEvent } from 'pubnub';
import { mockDate, promisifyMiddleware } from '../testUtils';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { setPrimaryPane } from '../../src/pane/dux';

jest.mock('../../src/io/location');
jest.mock('graphql.js');
jest.mock('../../src/io/graphQL');
jest.mock('pubnub');

Enzyme.configure({ adapter: new Adapter() });

describe('Test leave channel', () => {
  mockDate('Wed Jun 27 2018 16:53:06 GMT-0000');
  const message = {
    channelToken: 'test',
    messageText: 'Tony Hoare has left the chat',
    userId: 'abc123xyz',
    fromNickname: 'Tony Hoare',
    type: 'system',
    roomType: 'public',
    timestamp: '2018-06-27 16:53:6 +0000',
  };
  global.document.cookie  = 'legacy_token=12345; ';
  mockFetch.mockResolvedValueOnce(accessToken);
  mockFetch.mockResolvedValueOnce(testData);
  const actorMiddlewareApplied = actorMiddleware(
    serviceActor,
    ChatActor,
  );

  test.skip('Remove channel and send pubnub notification', () => {
    const participants = [
      {
        pubnubToken: 'abc123xyz',
        name: 'Tony Hoare',
        role: { label: '' },
      },
      {
        pubnubToken: '54353',
        name: 'Shaq O.',
        role: { label: '' },
      },
    ];

    const middlewareList = [promisifyMiddleware, actorMiddlewareApplied];
    const store = createStore(
      reducer,
      compose(
        applyMiddleware(...middlewareList)
      )
    );

    return store.dispatch({ type: REHYDRATE }).then(() => {
      store.dispatch(
        addChannel('test', 'test', false, participants)
      );

      store.dispatch(
        setPrimaryPane('test', 'CHAT')
      );

      store.dispatch(
        togglePopUpModal()
      );

      mockFetch.mockResolvedValueOnce(accessToken);

      const wrapper = Enzyme.mount(
        <Provider store={store}>
          <div>
            <PopUpModal />
          </div>
        </Provider>
      );

      wrapper.find('button').at(1).simulate('click');
      expect(mockPublish).toHaveBeenCalledTimes(1);
      expect(mockUnsubscribe).toHaveBeenCalledTimes(1);
      expect(mockUnsubscribe).toHaveBeenCalledWith(
        {
          channels: ['test'],
        }
      );
      expect(Object.keys(store.getState().feed.channels).length).toEqual(4);
      expect(store.getState().panes.primary.channelId).toEqual('1ebd2b8e3530d1acaeba2be9c1875ad21376134e4b49e17fdbea6b6ba0930b6c');
      expect(mockLeaveChannel).toHaveBeenCalledTimes(1);
      expect(mockLeaveChannel).toHaveBeenCalledWith('test');
    });
  });

  test('Receive leave channel and publish notification', () => {
    const store = {
      ...defaultState,
      currentUser: {
        id: '12234',
        pubnubToken: '54353',
        pubnubAccessKey: '09876',
        name: 'Shaq O.',
        role: {
          label: '',
          permissions: [],
        },
      },
      organization: {
        id: 2,
        name: 'Life.Church',
      },
      pubnubKeys: {
        publish: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
        subscribe: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
      },
      channels: {
        ...defaultState.channels,
        test: {
          name: 'test',
          id: 'test',
          direct: false,
          moments: [],
          anchorMoments: [],
          participants: [
            {
              pubnubToken: 'abc123xyz',
              name: 'Tony Hoare',
              role: { label: '' },
            },
            {
              pubnubToken: '54353',
              name: 'Shaq O.',
              role: { label: '' },
            },
          ],
          scrollPosition: 0,
        },
      },
    };

    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(store);

    const chat = new ChatActor(dispatch, getState);

    chat.init();

    __messageEvent(
      {
        channel: 'test',
        message: {
          action: 'newMessage',
          channel: 'test',
          data: message,
        },
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0]).toEqual(
      {
        channel: 'test',
        moment: {
          id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
          name: 'Tony Hoare',
          notificationType: 'LEFT_CHANNEL',
          timestamp: expect.stringMatching(/^(\d{1,2}):(\d{2})(\s*[ap]m?)$/i),
          type: 'NOTIFICATION',
        },
        type: 'RECEIVE_MOMENT',
      }
    );
  });
});
