// @flow
import React from 'react';
import Chat from '../../src/chat/chat';
import ConnectedChat from '../../src/chat';
import { fireEvent } from 'react-testing-library';
import { mockDate, renderWithReduxAndTheme } from '../testUtils';
import { defaultState } from '../../src/feed/dux';

const otherUser = {
  id: 12345,
  avatar: null,
  pubnubToken: '12345',
  name: 'Billy Bob',
  role: {
    label: '',
  },
  preferences: {
    textMode: 'COMPACT',
  },
};

describe('Chat tests', () => {
  test('has a InputField and Button', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Chat
        setChatFocus={function () {}}
        toggleHideVideo={function () {}}
        buttonOnClick={function () {}}
        focused={true}
        enterDetect={function () {}}
        currentPlaceholder=""
        currentChannel="public"
        currentUser={otherUser}
        publishMessage={() => {}}
        hideReactions={true}
        translateLanguage='en'
      />
    );

    fireEvent.change(getByTestId('chat-input'), { target: { value: 'Hello' } });
    expect(getByTestId('chat-input').value).toEqual('Hello');
    expect(getByTestId('chat-submit-button')).toBeTruthy();
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
        currentUser={otherUser}
        publishMessage={() => {}}
        hideReactions={true}
        translateLanguage='en'
      />
    );

    expect(getByTestId('chat-submit-button')).toHaveProperty('disabled');
  });

  test('focuses the correct channel', () => {
    const initialState = {
      feed: {
        ...defaultState,
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
            participants: [],
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
        ...defaultState,
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
            participants: [],
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
        ...defaultState,
        currentUser: {
          id: 12345,
          pubnubToken: '09876',
          pubnubAccessKey: '67890',
          avatar: null,
          name: 'Kylo Ren',
          role: {
            label: '',
            permissions: [],
          },
          preferences: {
            textMode: '',
          },
        },
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
            participants: [],
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
          moments: [
            {
              id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
              isMuted: false,
              lang: 'en',
              messageTrayOpen: false,
              sender: {
                id: 12345,
                pubnubToken: '09876',
                avatar: null,
                name: 'Kylo Ren',
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
        ...defaultState,
        currentUser: {
          id: 12345,
          pubnubToken: '09876',
          pubnubAccessKey: '67890',
          avatar: null,
          name: 'Kylo Ren',
          role: {
            label: '',
            permissions: [],
          },
          preferences: {
            textMode: '',
          },
        },
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
            participants: [],
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
          moments: [
            {
              id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
              isMuted: false,
              lang: 'en',
              messageTrayOpen: false,
              sender: {
                id: 12345,
                pubnubToken: '09876',
                avatar: null,
                name: 'Kylo Ren',
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
      sequence: {
        serverTime: 0,
        steps: [],
      },
      schedule: [],
      feed: {
        ...defaultState,
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
            participants: [],
          },
        },
      },
    };

    const { getByTestId, store } = renderWithReduxAndTheme(<ConnectedChat channel='public' />, initialState);
    fireEvent.change(getByTestId('chat-input'), { target: { value: 'Hello' } });
    fireEvent.keyPress(getByTestId('chat-input'), { key: 'Space', code: 32, charCode: 32 });

    expect(store.getState()).toEqual(initialState);
  });
});
