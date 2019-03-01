// @flow
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Enzyme from 'enzyme';
import { mountWithTheme } from '../testUtils';

import { MESSAGE } from '../../src/moment';

import Feed from '../../src/feed/feed';
import FeedActionBanner from '../../src/components/actionBanner';
import Button, {BUTTON_SECONDARY, BUTTON_SMALL} from '../../src/components/button';
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';
import { Provider } from 'react-redux';

Enzyme.configure({ adapter: new Adapter() });

describe('Feed tests', () => {
  const user = {
    pubnubToken: '12345',
    id: '01928374',
    pubnubAccessKey: '098765',
    name: 'Billy Bob',
    role: {
      label: '',
      permissions: [],
    },
  };

  test('has an empty feed', () => {
    const wrapper = mountWithTheme(
      <Feed
        moments={[]}
        anchorMoments={[]}
        currentChannel="default"
        appendingMessage={false}
        animatingMoment={false}
        showLeaveChat={true}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
        scroll={{type: 'NO_SCROLL'}}
        currentUser={user}
        updateScrollPosition={() => {}}
        channel="default"
        showNewMessageButton={false}
        isChatFocused={false}
        setSawLastMomentAt={() => {}}
      />
    );
    expect(wrapper.find('ul').children().length).toBe(1);
  });

  test('has a single message', () => {
    const moments = [
      {
        type: MESSAGE,
        id: 'string',
        text: 'This is a message',
        sender: {
          id: '12345',
          name: 'Billy Bob',
        },
        messageTrayOpen: false,
      },
    ];

    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );
    const wrapper = mountWithTheme(
      <Provider store={store}>
        <Feed
          offset={0}
          moments={moments}
          anchorMoments={[]}
          onMessageRender={function () {}}
          currentChannel="default"
          appendingMessage={false}
          animatingMoment={true}
          showLeaveChat={true}
          isPopUpModalVisible={false}
          togglePopUpModal={() => {}}
          scroll={{type: 'NO_SCROLL'}}
          currentUser={user}
          updateScrollPosition={() => {}}
          channel="default"
          showNewMessageButton={false}
          isChatFocused={false}
          setSawLastMomentAt={() => {}}
        />
      </Provider>
    );

    expect(wrapper.find('ul').children().length).toBe(1);
    expect(wrapper.find('li').at(0).childAt(0).props().data).toEqual(
      {
        id: 'string',
        text: 'This is a message',
        sender: {
          id: '12345',
          name: 'Billy Bob',
        },
        type: 'MESSAGE',
        messageTrayOpen: false,
      }
    );
  });

  test('check for key prop', () => {
    const wrapper = mountWithTheme(
      <Feed
        offset={0}
        moments={[]}
        anchorMoments={[]}
        onMessageRender={function () {}}
        currentChannel="default"
        appendingMessage={false}
        animatingMoment={false}
        showLeaveChat={true}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
        scroll={{type: 'NO_SCROLL'}}
        currentUser={user}
        updateScrollPosition={() => {}}
        channel="default"
        showNewMessageButton={false}
        isChatFocused={false}
        setSawLastMomentAt={() => {}}
      />
    );
    expect(wrapper.find('ul').first().key()).toEqual('default');
  });

  test('Feed with participants', () => {
    const wrapper = mountWithTheme(
      <Feed
        offset={0}
        moments={[]}
        anchorMoments={[]}
        onMessageRender={function () {}}
        currentChannel="host"
        appendingMessage={false}
        animatingMoment={false}
        showLeaveChat={true}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
        scroll={{type: 'NO_SCROLL'}}
        currentUser={user}
        updateScrollPosition={() => {}}
        channel="default"
        showNewMessageButton={false}
        isChatFocused={false}
        setSawLastMomentAt={() => {}}
      />
    );
    expect(wrapper.find(FeedActionBanner).length).toBe(1);
  });

  test('Feed with New Message button', () => {
    const wrapper = mountWithTheme(
      <Feed
        offset={0}
        moments={[]}
        anchorMoments={[]}
        onMessageRender={function () {}}
        currentChannel="host"
        appendingMessage={false}
        animatingMoment={false}
        showLeaveChat={false}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
        scroll={{type: 'NO_SCROLL'}}
        currentUser={user}
        updateScrollPosition={() => {}}
        channel="default"
        showNewMessageButton={true}
        isChatFocused={false}
        setSawLastMomentAt={() => {}}
      />
    );
    const button = wrapper.find(Button);
    expect(button.exists()).toBeTruthy();
    expect(button.length).toBe(1);
    const {
      children,
      variant,
      size,
    } = button.first().props();
    expect(children).toBe('New Messages');
    expect(variant).toBe(BUTTON_SECONDARY);
    expect(size).toBe(BUTTON_SMALL);
  });
});
