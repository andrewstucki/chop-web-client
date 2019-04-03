// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState, addChannel } from '../../src/feed/dux';
import { publishMessage } from '../../src/moment/message/dux';
import ImageAvatar from '../../src/avatar/imageAvatar';
import InitialAvatar from '../../src/avatar/initialAvatar';
import Feed from '../../src/feed';
import { setPrimaryPane } from '../../src/pane/dux';
import { mountWithTheme } from '../testUtils';

Enzyme.configure({ adapter: new Adapter() });

describe('Test Avatar', () => {
  test('Image avatar loaded when available and added to messages in feed', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
          panes: {
            primary: {
              type: 'CHAT',
              content: {},
            },
          },
        },
      }
    );

    const wrapper = mountWithTheme(
      <Provider store={store}>
        <Feed channel="public"/>
      </Provider>
    );

    store.dispatch(
      addChannel('public', 'public', false, [])
    );

    store.dispatch(
      setPrimaryPane('EVENT', 'public')
    );

    store.dispatch(
      publishMessage('public', 'Hello, world.', {
        id: 12345,
        name: 'Shine',
        avatar: 'https://web-assets.life.church/assets/pages/kids/ec-icon-412a05a885c0a86bff7c5ac9abe1d703f9df9889b79c58e85debc32220cf7310.svg',
        pubnubToken: '123456',
        role: {
          label: 'host',
        },
      })
    );

    wrapper.update();
    const imageAvatar = wrapper.find(ImageAvatar);
    expect(imageAvatar.exists()).toBeTruthy();
    expect(imageAvatar.prop('url')).toBe('https://web-assets.life.church/assets/pages/kids/ec-icon-412a05a885c0a86bff7c5ac9abe1d703f9df9889b79c58e85debc32220cf7310.svg');
  });

  test('Initial avatar loaded when image is not available and added to messages in feed', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
          panes: {
            primary: {
              type: 'CHAT',
              content: {},
            },
          },
        },
      }
    );

    const wrapper = mountWithTheme(
      <Provider store={store}>
        <Feed channel="public" />
      </Provider>
    );

    store.dispatch(
      addChannel('public', 'public', false, [])
    );

    store.dispatch(
      setPrimaryPane('EVENT', 'public')
    );

    store.dispatch(
      publishMessage('public', 'Hello, world.', {
        id: 12345,
        name: 'Shine',
        avatar: null,
        pubnubToken: '123456',
        role: {
          label: 'host',
        },
      })
    );

    wrapper.update();
    const initialAvatar = wrapper.find(InitialAvatar);
    expect(initialAvatar.exists()).toBeTruthy();
    expect(initialAvatar.prop('name')).toBe('Shine');
  });
});
