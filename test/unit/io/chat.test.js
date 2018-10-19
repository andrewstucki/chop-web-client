// @flow
import Pubnub,
{
  mockSubscribe,
  mockAddListener,
  __subscribeEvent,
  __messageEvent,
  mockPublish,
  mockSetState,
} from 'pubnub';
import Chat from '../../../src/io/chat';
import { defaultState, addChannel } from '../../../src/feed/dux';
import { setLanguage } from '../../../src/languageSelector/dux';
import Converter from '../../../src/io/converter';
jest.mock('pubnub');
jest.mock('../../../src/io/converter');

describe('Chat2 Tests', () => {
  beforeEach(() => {
    mockSetState.mockReset();
    mockSubscribe.mockReset();
    mockPublish.mockReset();
  });

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
      '123456': {
        name: 'public',
        id: '123456',
        moments: [],
      },
      '789012': {
        name: 'Host',
        id: '789012',
        moments: [],
      },
    },
  };

  test('Immediately returns if no action is provided to dispatch.', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState);

    chat.dispatch({type: undefined});
    expect(mockSubscribe).toHaveBeenCalledTimes(0);
    expect(mockPublish).toHaveBeenCalledTimes(0);
    expect(mockSetState).toHaveBeenCalledTimes(0);
    expect(mockAddListener).toHaveBeenCalledTimes(0);
  });

  test('Immediately returns if action is not listened for.', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState);

    chat.dispatch({type:'DUMMY_ACTION'});

    expect(mockSubscribe).toHaveBeenCalledTimes(0);
    expect(mockPublish).toHaveBeenCalledTimes(0);
    expect(mockSetState).toHaveBeenCalledTimes(0);
    expect(mockAddListener).toHaveBeenCalledTimes(0);
  });

  test('Connect to pubnub channels', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState);

    chat.init();

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
        channels: ['123456', '789012'],
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

    chat.init();

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

    chat.init();
    
    chat.dispatch(
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        moment: message,
        channel: '123456',
      }
    );

    expect(mockPublish).toHaveBeenCalledTimes(1);
    expect(Converter.cwcToLegacy).toHaveBeenCalledTimes(1);
    expect(Converter.cwcToLegacy).toHaveBeenCalledWith(message, '123456');
    expect(mockPublish.mock.calls[0][0]).toEqual(
      {
        channel: '123456',
        message: {
          action: 'newMessage',
          channel: '123456',
          data: message,
        },
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

    const chat = new Chat(dispatch, getState);

    chat.init();
    
    __messageEvent(
      {
        channel: 'public',
        message: {
          action: 'newMessage',
          channel: 'public',
          data: message,
        },
        publisher: '123456',
        subscription: null,
        timetoken: '14966804541029440',
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0]).toEqual(
      {
        type: 'RECEIVE_MOMENT',
        channel: 'public',
        moment: message,
      }
    );
  });

  test('Change Language', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState);

    chat.init();

    chat.dispatch(setLanguage('ko'));

    expect(mockSetState).toHaveBeenCalledTimes(1);
    expect(mockSetState).toHaveBeenCalledWith(
      {
        channels: ['123456','789012'],
        state: {
          language: 'ko',
          prevLanguage: null,
        },
      }
    );
  });

  test('Subscribe', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState);

    chat.init();

    chat.dispatch(addChannel('direct', 'asd2389dhsdf'));

    expect(mockSubscribe).toHaveBeenCalledTimes(2);
    expect(mockSubscribe).toHaveBeenCalledWith(
      {
        channels: ['asd2389dhsdf'],
      }
    );
  });

  test('Set Available for Prayer', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState);

    chat.init();
    
    chat.dispatch(
      {
        type: 'SET_AVAILABLE_FOR_PRAYER',
        status: true,
      }
    ); 

    expect(mockSetState).toHaveBeenCalledTimes(1);
    expect(mockSetState).toHaveBeenCalledWith(
      {
        channels: ['123456','789012'],
        state: {
          available_prayer: true, // eslint-disable-line camelcase
        },
      }
    );
  });

  test('Receive prayer request from legacy', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();

    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState);

    chat.dispatch(
      {
        type: 'SET_PUBNUB_KEYS',
      }
    );
    
    __messageEvent(
      {
        channel: 'public',
        message: {
          action: 'newLiveResponseRequest',
          data: {
            fromToken: 'jarjartoken',
            fromNickname: 'JarJar',
            channel: 'public',
            type: 'prayer',
          },
        },
        publisher: '123456',
        subscription: null,
        timetoken: '14966804541029440',
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0]).toMatchObject(
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: '789012',
        moment: {
          type: 'ACTIONABLE_NOTIFICATION',
          notificationType: 'PRAYER_REQUEST',
          id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
          user: {
            name: 'JarJar',
            pubnubToken: 'jarjartoken',
          },
          active: true,
          timeStamp: expect.stringMatching(/((1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm]))/),
        },
      }
    );
  });
});
