import { 
  mockPublish,
  __messageEvent, 
} from 'pubnub';
import Chat from '../../../src/io/chat';
import reducer, { defaultState } from '../../../src/feed/dux';
import { createStore } from 'redux';
  
describe('Reaction2 Tests', () => {
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
        id: '123456',
        name: 'Public',
        moments: [],
      },
    },
  };

  test('Publish Reaction', () => {
    const reaction = {
      type: 'REACTION',
      id: '123456',
      user: {
        pubnubToken: '098765',
        name: 'Hillsong Young & Free',
        role: {
          label: '',
        },
      },
    };
    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(store);

    const chat = new Chat(dispatch, getState);
    chat.init();

    chat.dispatch(
      {
        type: 'PUBLISH_REACTION',
        channel: '123456',
        reaction: reaction,
      }
    );

    expect(mockPublish).toHaveBeenCalledTimes(1);
    expect(mockPublish.mock.calls[0][0]).toEqual(
      {
        channel: 'public',
        message: {
          action: 'videoReaction',
          channel: 'public',
          data: {
            channelToken: 'public',
            nickname: 'Hillsong Young & Free',
            reactionId: '123456',
          },
        },
      }
    );
  });

  test('Receive Reaction', () => {
    const reaction = {
      nickname: 'test',
      channelToken: '123456',
      reactionId: '123456',
    };

    const dispatch = jest.fn();
    const getState = jest.fn().mockReturnValue(store);

    const chat = new Chat(dispatch, getState);
    chat.init();
    
    __messageEvent(
      {
        channel: '123456',
        message: {
          action: 'videoReaction',
          data: reaction,
        },
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch.mock.calls[0][0]).toEqual(
      {
        type: 'RECEIVE_REACTION',
        reaction: {
          type: 'REACTION',
          id: '123456',
        },
      }
    );
  });

  test('Receive Reaction adds Reaction to state', () => {
    const reaction = {
      nickname: 'test',
      channelToken: '123456',
      reactionId: '123456',
    };
    const store = createStore(
      reducer,
      {
        ...defaultState,
        currentUser: {
          pubnubToken: '123456',
          name: 'Billy Bob',
          role: { label: '' },
        },
      }
    );
    
    const chat = new Chat(store.dispatch, store.getState);
    chat.onMessage(
      {
        channel: 'test_channel',
        message: {
          action: 'videoReaction',
          data: reaction,
        },
      }
    );

    expect(store.getState().reactions.length).toBe(1);
    expect(store.getState().reactions[0]).toEqual(
      {
        type: 'REACTION',
        id: '123456',
      }
    );
  });
});