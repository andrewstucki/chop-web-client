// @flow
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Enzyme from 'enzyme';

import { MESSAGE } from '../../src/moment/dux';

import Feed from '../../src/feed/feed';
import FeedActionBanner from '../../src/feed/feedActionBanner';
import Button from '../../src/components/button';

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
    const wrapper = Enzyme.shallow(
      <Feed
        moments={[]}
        anchorMoments={[]}
        currentChannel="default"
        appendingMessage={false}
        animatingMoment={false}
        showLeaveChat={true}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
        scrollPosition={0}
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
          nickname: 'Billy Bob',
        },
        messageTrayOpen: false,
      },
    ];
    const wrapper = Enzyme.shallow(
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
        scrollPosition={0}
        currentUser={user}
        updateScrollPosition={() => {}}
        channel="default"
        showNewMessageButton={false}
        isChatFocused={false}
        setSawLastMomentAt={() => {}}
      />
    );
    
    expect(wrapper.find('ul').children().length).toBe(1);
    expect(wrapper.find('li').at(0).childAt(0).props().data).toEqual(
      {
        id: 'string',
        text: 'This is a message',
        sender: {
          id: '12345',
          nickname: 'Billy Bob',
        },
        messageTrayOpen: false,
      }
    );
  });

  test('check for key prop', () => {
    const wrapper = Enzyme.shallow(
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
        scrollPosition={0}
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
    const wrapper = Enzyme.shallow(
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
        scrollPosition={0}
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
    const wrapper = Enzyme.shallow(
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
        scrollPosition={0}
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
      buttonStyle,
      small,
      text,
    } = button.first().props();
    expect(text).toBe('New Messages');
    expect(buttonStyle).toBe('secondary');
    expect(small).toBe(true);
  });
});
