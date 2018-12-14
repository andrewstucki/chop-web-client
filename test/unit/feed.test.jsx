// @flow
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import Enzyme from 'enzyme';

import { MESSAGE } from '../../src/moment/dux';

import Feed from '../../src/feed/feed';
import FeedActionBanner from '../../src/feed/feedActionBanner';

Enzyme.configure({ adapter: new Adapter() });

describe('Feed tests', () => {
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
        updateScrollPosition={() => {}}
        channel="default"
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
        user: {
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
        updateScrollPosition={() => {}}
        channel="default"
      />
    );
    
    expect(wrapper.find('ul').children().length).toBe(1);
    expect(wrapper.find('li').at(0).childAt(0).props().data).toEqual(
      {
        id: 'string',
        text: 'This is a message',
        user: {
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
        updateScrollPosition={() => {}}
        channel="default"
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
        updateScrollPosition={() => {}}
        channel="default"
      />
    );
    expect(wrapper.find(FeedActionBanner).length).toBe(1);
  });
});
