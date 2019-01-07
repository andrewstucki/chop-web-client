// @flow
import serviceActor from '../../src/io/serviceActor';
import ChatActor from '../../src/io/chat';
import { mockFetch } from 'graphql.js';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { createStore, applyMiddleware, compose } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState, addChannel, loadHistory } from '../../src/feed/dux';
import { deleteMessage, publishDeleteMessage } from '../../src/moment/message/dux';
import actorMiddleware from '../../src/middleware/actor-middleware';
import testData from './io/test-data.json';
import accessToken from './io/access-token.json';
import { mockPublish, __messageEvent } from 'pubnub';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { promisifyMiddleware } from '../testUtils';
import { setPrimaryPane } from '../../src/pane/dux';

jest.mock('../../src/io/location');
jest.mock('graphql.js');
jest.mock('../../src/io/graphQL');
jest.mock('pubnub');

Enzyme.configure({ adapter: new Adapter() });

describe('Test delete message', () => {
  const message = {
    channelToken: 'test',
    umt: '123456',
  };
  global.document.cookie  = 'legacy_token=12345; ';
  mockFetch.mockResolvedValueOnce(accessToken);
  mockFetch.mockResolvedValueOnce(testData);
  const actorMiddlewareApplied = actorMiddleware(
    serviceActor,
    ChatActor,
  );
  const moments = [
    {
      type: 'MESSAGE',
      id: '123456',
      lang: 'en',
      text: 'hi',
      sender: {
        pubnubToken: 'abc123xyz',
        name: 'Tony Hoare',
        role: { label: '' },
      },
      messageTrayOpen: false,
      closeTrayButtonRendered: true,
    },
    {
      type: 'MESSAGE',
      id: '789012',
      lang: 'en',
      text: 'hey',
      sender: {
        pubnubToken: '54353',
        name: 'Shaq O.',
        role: { label: '' },
      },
      messageTrayOpen: false,
      closeTrayButtonRendered: true,
    },
  ];

  test.skip('Delete message and publish on pubnub', async () => {
    const participants = [
      {
        id: '12345',
        pubnubToken: 'abc123xyz',
        name: 'Tony Hoare',
        role: { label: '' },
      },
      {
        id: '12345',
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
      store.dispatch(addChannel('test', 'test', false, participants));
      store.dispatch(setPrimaryPane('test', 'EVENT'));
      store.dispatch(loadHistory(moments, 'test'));
      store.dispatch(deleteMessage('123456', 'test'));
      store.dispatch(publishDeleteMessage('123456'));
      
      mockFetch.mockResolvedValueOnce(accessToken);

      expect(mockPublish).toHaveBeenCalledTimes(1);
      expect(mockPublish.mock.calls[0][0]).toEqual(
        {
          channel: 'test',
          message: {
            action: 'muteMessage',
            channel: 'test',
            data: message,
          },
        }
      );
      expect(store.getState().feed.channels.test.moments.length).toEqual(1);
    });
  });

  test('Receive delete message notification and delete message', () => {
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
          moments: moments,
          anchorMoments: [],
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
          action: 'muteMessage',
          channel: 'test',
          data: message,
        },
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0]).toEqual(
      {
        type: 'DELETE_MESSAGE',
        channel: 'test',
        id: '123456',
      }
    );
  });
});