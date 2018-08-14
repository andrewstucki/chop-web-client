// @flow
import Pubnub,
{
  mockSubscribe,
  mockAddListener,
  __subscribeEvent,
  __messageEvent,
  mockPublish,
} from 'pubnub';
import Chat from '../../../src/io/chat/chat2';
import { defaultState } from '../../../src/feed/dux';
import Converter from '../../../src/io/converter';
jest.mock('pubnub');
jest.mock('../../../src/io/converter');

describe('Chat2 Tests', () => {
  const store = {
    ...defaultState,
    currentUser: {
      ...defaultState.currentUser,
      pubnubToken: '123456',
      pubnubAccessKey: '1533912921585',
    },
    event: {
      id: 320418,
      startTime: 1529425800000,
      title: 'When Pigs Fly - Week 2',
      timezone: 'Central',
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
      public: {
        name: 'public',
        id: '123456',
        moments: [],
      },
    },
  };

  test('Connect to pubnub channels', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState); // eslint-disable-line no-unused-vars 

    chat.dispatch(
      {
        type: 'CHAT_CONNECT',
      }
    );

    expect(Converter.config).toHaveBeenCalledTimes(1);
    expect(Converter.config).toHaveBeenCalledWith(getState);

    expect(Pubnub).toHaveBeenCalledTimes(1);
    expect(Pubnub).toHaveBeenCalledWith(
      {
        publishKey: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
        subscribeKey: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
        authKey: '1533912921585',
        uuid: '123456',
      }
    );
    expect(mockSubscribe).toHaveBeenCalledTimes(1);
    expect(mockSubscribe).toHaveBeenCalledWith(
      {
        channels: ['123456'],
      }
    );
    expect(mockAddListener).toHaveBeenCalledTimes(1);
    expect(mockAddListener).toHaveBeenCalledWith(
      {
        status: chat.onStatus,
        message: chat.onMessage,
      }
    );
  });

  test('Status Events', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState); // eslint-disable-line no-unused-vars 

    chat.dispatch(
      {
        type: 'CHAT_CONNECT',
      }
    );

    __subscribeEvent(
      {
        category: 'PNConnectedCategory',
        operation: 'PNSubscribeOperation',
        affectedChannels: ['123456'],
        subscribedChannels: ['123456'],
        affectedChannelGroups: [],
        lastTimetoken: '14974492380756600',
        currentTimetoken: '14974492384874375',
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      {
        type: 'CHAT_CONNECTED',
      }
    );
  });

  test('Publish Message', () => {
    const message = {
      type: 'MESSAGE',
      id: '123456',
      lang: 'en',
      text: 'You kindness leads us to repentance to the heart of God',
      user: {
        pubnubToken: '098765',
        name: 'Hillsong Young & Free',
        role: {
          label: '',
        },
      },
      messageTrayOpen: false,
      closeTrayButtonRendered: false,
    };
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState); // eslint-disable-line no-unused-vars 

    chat.dispatch(
      {
        type: 'CHAT_CONNECT',
      }
    );

    chat.dispatch(
      {
        type: 'PUBLISH_MOMENT',
        moment: message,
        channel: 'public',
      }
    );

    expect(mockPublish).toHaveBeenCalledTimes(1);
    expect(Converter.cwcToLegacy).toHaveBeenCalledTimes(1);
    expect(Converter.cwcToLegacy).toHaveBeenCalledWith(message, 'public');
    expect(mockPublish).toHaveBeenCalledWith(
      {
        channel: 'public',
        message: message,
      }
    );
  });

  test('Receive Message', () => {
    const message = {
      type: 'MESSAGE',
      id: '123456',
      lang: 'en',
      text: 'You kindness leads us to repentance to the heart of God',
      user: {
        pubnubToken: '098765',
        name: 'Hillsong Young & Free',
        role: {
          label: '',
        },
      },
      messageTrayOpen: false,
      closeTrayButtonRendered: false,
    };
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState); // eslint-disable-line no-unused-vars 

    chat.dispatch(
      {
        type: 'CHAT_CONNECT',
      }
    );
    
    __messageEvent(
      {
        channel: 'public',
        message: message,
        publisher: '123456',
        subscription: null,
        timetoken: '14966804541029440',
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenLastCalledWith(
      {
        type: 'RECEIVE_MOMENT',
        moment: message,
      }
    );
  });
});