// @flow
import React from 'react';
import Chat from '../../src/chat/chat';
import ConnectedChat from '../../src/chat';
import sinon from 'sinon';
import { fireEvent } from '@testing-library/react';
import { mockDate, renderWithReduxAndTheme } from '../testUtils';
import { defaultState as defaultFeedState } from '../../src/feed/dux';
import { defaultState as defaultChopState } from '../../src/chop/dux';
import { defaultState as defaultEventState} from '../../src/event/dux';

const otherSubscriber = {
  id: '12345',
  avatar: null,
  nickname: 'Billy Bob',
  role: {
    label: '',
  },
};

describe('Chat tests', () => {
  test('has a InputField and Button', () => {
    const saveMessage = sinon.spy();
    const { getByTestId } = renderWithReduxAndTheme(
      <Chat
        setChatFocus={function () {}}
        toggleHideVideo={function () {}}
        buttonOnClick={function () {}}
        focused={true}
        enterDetect={function () {}}
        currentPlaceholder=""
        currentChannel="public"
        currentSubscriber={otherSubscriber}
        publishMessage={() => {}}
        hideReactions={true}
        translateLanguage='en'
        message=''
        saveMessage={saveMessage}
        clearMessage={() => {}}
        setNickname={() => {}}
      />
    );

    fireEvent.change(getByTestId('chat-input'), { target: { value: 'Hello' } });
    expect(saveMessage.calledOnce).toEqual(true);
  });

  test('has a InputField and disabled Button', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Chat
        setChatFocus={function () {}}
        toggleHideVideo={function () {}}
        buttonOnClick={function () {}}
        focused={false}
        enterDetect={function () {}}
        currentPlaceholder=""
        currentChannel="public"
        currentSubscriber={otherSubscriber}
        publishMessage={() => {}}
        hideReactions={true}
        translateLanguage='en'
        message=''
        saveMessage={() => {}}
        clearMessage={() => {}}
        setNickname={() => {}}
      />
    );

    expect(getByTestId('chat-submit-button')).toHaveProperty('disabled');
  });

  test('sets the message based on the last message state', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Chat
        setChatFocus={function () {}}
        toggleHideVideo={function () {}}
        buttonOnClick={function () {}}
        focused={false}
        enterDetect={function () {}}
        currentPlaceholder=""
        currentChannel="public"
        currentSubscriber={otherSubscriber}
        publishMessage={() => {}}
        hideReactions={true}
        translateLanguage='en'
        message='hi'
        saveMessage={() => {}}
        clearMessage={() => {}}
        setNickname={() => {}}
      />
    );
    const chatInput = getByTestId('chat-input');
    expect(chatInput.value).toBe('hi');
  });

  test('focuses the correct channel', () => {
    const initialState = {
      feed: {
        ...defaultFeedState,
        channels: {
          public: {
            id: 'public',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 0,
            subscribers: [],
          },
        },
      },
    };

    const { getByTestId, store } = renderWithReduxAndTheme(<ConnectedChat channel='public' />, initialState);

    fireEvent.focus(getByTestId('chat-input'));
    const { lastAction:__remove, ...state } = store.getState().feed;
    expect(state).toEqual({
      ...initialState.feed,
      focusedChannel: 'public',
    });
  });

  test('blurs the correct channel', () => {
    const initialState = {
      feed: {
        ...defaultFeedState,
        channels: {
          public: {
            id: 'public',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 0,
            subscribers: [],
            message: '',
          },
        },
        focusedChannel: 'public',
      },
    };

    const { getByTestId, store } = renderWithReduxAndTheme(<ConnectedChat channel='public' />, initialState);

    fireEvent.blur(getByTestId('chat-input'));
    const { lastAction:__remove, ...state } = store.getState().feed;
    expect(state).toEqual({
      ...initialState.feed,
      focusedChannel: '',
    });
  });

  test('sends message to correct channel', () => {
    mockDate(1546896104521);
    const initialState = {
      feed: {
        ...defaultFeedState,
        channels: {
          public: {
            id: 'public',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 0,
            subscribers: [],
          },
        },
      },
      subscriber: {
        currentSubscriber: {
          id: '12345',
          pubnubAccessKey: '67890',
          avatar: null,
          nickname: 'Kylo Ren',
          role: {
            label: '',
            permissions: [],
          },
          preferences: {
            textMode: '',
          },
        },
      },
    };

    const { getByTestId, store } = renderWithReduxAndTheme(<ConnectedChat channel='public' />, initialState);
    fireEvent.change(getByTestId('chat-input'), { target: { value: 'Hello' } });
    fireEvent.click(getByTestId('chat-submit-button'));

    const { lastAction:__remove, ...state } = store.getState().feed;
    expect(state).toEqual({
      ...initialState.feed,
      channels: {
        public: {
          ...initialState.feed.channels.public,
          message: '',
          moments: [
            {
              id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
              isMuted: false,
              lang: 'en',
              messageTrayOpen: false,
              subscriber: {
                id: '12345',
                avatar: null,
                nickname: 'Kylo Ren',
                role: {
                  label: '',
                },
              },
              text: 'Hello',
              timestamp: 1546896104521,
              type: 'MESSAGE',
            },
          ],
        },
      },
    });
  });

  test('pressing enter sends the message', () => {
    mockDate(1546896104521);
    const initialState = {
      feed: {
        ...defaultFeedState,
        channels: {
          public: {
            id: 'public',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 0,
            subscribers: [],
          },
        },
      },
      subscriber: {
        currentSubscriber: {
          id: 12345,
          pubnubAccessKey: '67890',
          avatar: null,
          nickname: 'Kylo Ren',
          role: {
            label: '',
            permissions: [],
          },
          preferences: {
            textMode: '',
          },
        },
      },
    };

    const { getByTestId, store } = renderWithReduxAndTheme(<ConnectedChat channel='public' />, initialState);
    fireEvent.change(getByTestId('chat-input'), { target: { value: 'Hello' } });
    fireEvent.keyPress(getByTestId('chat-input'), { key: 'Enter', code: 13, charCode: 13 });

    const { lastAction:__remove, ...state } = store.getState().feed;
    expect(state).toEqual({
      ...initialState.feed,
      channels: {
        public: {
          ...initialState.feed.channels.public,
          message: '',
          moments: [
            {
              id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
              isMuted: false,
              lang: 'en',
              messageTrayOpen: false,
              subscriber: {
                id: 12345,
                avatar: null,
                nickname: 'Kylo Ren',
                role: {
                  label: '',
                },
              },
              text: 'Hello',
              timestamp: 1546896104521,
              type: 'MESSAGE',
            },
          ],
        },
      },
    });
  });

  test('pressing key other than enter does not send the message', () => {
    const initialState = {
      ...defaultChopState,
      feed: {
        ...defaultFeedState,
        channels: {
          public: {
            id: 'public',
            name: 'public',
            type: 'public',
            direct: false,
            placeholder: false,
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 0,
            subscribers: [],
          },
        },
      },
      event: defaultEventState,
    };

    const { getByTestId, store } = renderWithReduxAndTheme(<ConnectedChat channel='public' />, initialState);
    fireEvent.change(getByTestId('chat-input'), { target: { value: 'Hello' } });
    fireEvent.keyPress(getByTestId('chat-input'), { key: 'Space', code: 32, charCode: 32 });

    expect(store.getState()).toEqual({
      ...initialState,
      feed: {
        ...initialState.feed,
        lastAction: {
          id: 'public',
          message: 'Hello',
          type: 'SET_CHANNEL_MESSAGE',
        },
        channels: {
          ...initialState.feed.channels,
          public: {
            ...initialState.feed.channels.public,
            message: 'Hello',
          },
        },
      },
    });
  });
});
