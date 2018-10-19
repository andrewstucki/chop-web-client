// @flow
import Chat from '../../src/io/chat';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import reducer from '../../src/chop/dux';
import { defaultState, addChannel, changeChannel, togglePopUpModal } from '../../src/feed/dux';
import actorMiddleware from '../../src/middleware/actor-middleware';
import 'pubnub';

jest.mock('pubnub');

Enzyme.configure({ adapter: new Adapter() });

describe('Load history', () => {

  test('Load history from pubnub', () => {
    const store = {
      ...defaultState,
      currentUser: {
        ...defaultState.currentUser,
        pubnubToken: '123456',
        pubnubAccessKey: '1533912921585',
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

    const dispatch = jest.fn();
    const getState = jest.fn();

    getState.mockReturnValue(store);

    const chat = new Chat(dispatch, getState);

    chat.dispatch(
      {
        type: 'CHAT_CONNECT',
      }
    );
  });
});