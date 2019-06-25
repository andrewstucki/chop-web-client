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
import { addChannel } from '../../../src/feed/dux';
import { defaultState } from '../../../src/chop/dux';
import { setLanguage } from '../../../src/languageSelector/dux';
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
    subscriber: {
      ...defaultState.subscriber,
      currentSubscriber: {
        id: '123456',
        nickname: 'Kylo Ren',
        avatar: 'http://someimageons3.com/image/123',
        firstName: 'Kylo',
        lastName: 'Ren',
        email: 'kyloren@darkside.com',
        phoneNumber: '',
        role: {
          label: 'Supreme Leader of the First Order',
          permissions: ['event.event.manage'],
        },
        pubnubAccessKey: '1533912921585',
        preferences: {
          textMode: 'COMPACT',
        },
      },
    },
    event: {
      id: '320418',
      eventTimeId: '1920834',
      startTime: 1529425800000,
      endTime: 1529425900000,
      title: 'When Pigs Fly - Week 2',
      timezone: 'Central',
      enabledFeatures: {
        chat: true,
      },
      eventNotes: '',
    },
    feed: {
      ...defaultState.feed,
      organization: {
        id: 2,
        name: 'Life.Church',
        logoUrl: '',
        theme: {
          headerBackgroundColor: '',
          headerMenuIconColor: '',
        },
      },
      pubnubKeys: {
        publish: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
        subscribe: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
      },
      channels: {
        ...defaultState.feed.channels,
        '123456': {
          name: 'public',
          id: '123456',
          direct: false,
          moments: [],
          anchorMoments: [],
          scrollPosition: 0,
          sawLastMomentAt: 1546896104521,
        },
        '789012': {
          name: 'Host',
          id: '789012',
          direct: false,
          moments: [],
          anchorMoments: [],
          scrollPosition: 0,
          sawLastMomentAt: 1546896104521,
        },
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

    expect(Pubnub).toHaveBeenCalledTimes(1);
    expect(Pubnub).toHaveBeenCalledWith(
      {
        publishKey: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
        subscribeKey: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
        authKey: '1533912921585',
        uuid: '123456',
      }
    );
    expect(mockAddListener).toHaveBeenCalledTimes(1);
    expect(mockAddListener).toHaveBeenCalledWith(
      {
        status: chat.onStatus,
        message: chat.onMessage,
        presence: chat.onPresence,
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

  test('Receive Message', () => {
    const message = {
      type: 'MESSAGE',
      id: '123456',
      lang: 'en',
      text: 'You kindness leads us to repentance to the heart of God',
      snder: {
        name: 'Hillsong Young & Free',
        role: {
          label: '',
        },
      },
      messageTrayOpen: false,
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
          available_help: true, // eslint-disable-line camelcase
          available_prayer: true, // eslint-disable-line camelcase
          avatar: 'http://someimageons3.com/image/123',
          clientIp: '205.236.56.99',
          country_name: 'United States', // eslint-disable-line camelcase
          lat: 35.6500,
          lon: -97.4214,
          nickname: 'Kylo Ren',
          subscriberId: null,
          language: 'en-US',
        },
      },
      expect.any(Function)
    );
  });

  test('Subscribe', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState);

    chat.init();

    chat.dispatch(addChannel('direct', 'asd2389dhsdf', 'direct', true));

    expect(mockSubscribe).toHaveBeenCalledTimes(1);
    expect(mockSubscribe).toHaveBeenCalledWith(
      {
        channels: ['asd2389dhsdf'],
        withPresence: true,
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
          available_help: true, // eslint-disable-line camelcase
          available_prayer: true, // eslint-disable-line camelcase
          avatar: 'http://someimageons3.com/image/123',
          clientIp: '205.236.56.99',
          country_name: 'United States', // eslint-disable-line camelcase
          lat: 35.6500,
          lon: -97.4214,
          nickname: 'Kylo Ren',
          subscriberId: null,
          language: 'en-US',
        },
      },
      expect.any(Function)
    );
  });
});
