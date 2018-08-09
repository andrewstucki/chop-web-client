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
        currentChannel="default"
        appendingMessage={false}
        animatingMoment={false}
        isPlaceholderPresent={true}
        hasParticipants={false}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
      />
    );
    expect(wrapper.find('ul').children().length).toBe(0);
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
        onMessageRender={function () {}}
        currentChannel="default"
        appendingMessage={false}
        animatingMoment={true}
        isPlaceholderPresent={true}
        hasParticipants={false}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
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
        onMessageRender={function () {}}
        currentChannel="default"
        appendingMessage={false}
        animatingMoment={false}
        isPlaceholderPresent={true}
        hasParticipants={false}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
      />
    );
    expect(wrapper.find('ul').key()).toEqual('default');
  });

  test('Feed with placeholder present on host channel', () => {
    const wrapper = Enzyme.shallow(
      <Feed
        offset={0}
        moments={[]}
        onMessageRender={function () {}}
        currentChannel="host"
        appendingMessage={false}
        animatingMoment={false}
        isPlaceholderPresent={true}
        hasParticipants={false}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('withPlaceholder');
  });

  test('Feed with placeholder present on event channel', () => {
    const wrapper = Enzyme.shallow(
      <Feed
        offset={0}
        moments={[]}
        onMessageRender={function () {}}
        currentChannel="public"
        appendingMessage={false}
        animatingMoment={false}
        isPlaceholderPresent={true}
        hasParticipants={false}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('withoutPlaceholder');
  });

  test('Feed without placeholder present on host channel', () => {
    const wrapper = Enzyme.shallow(
      <Feed
        offset={0}
        moments={[]}
        onMessageRender={function () {}}
        currentChannel="host"
        appendingMessage={false}
        animatingMoment={false}
        isPlaceholderPresent={false}
        hasParticipants={false}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('withoutPlaceholder');
  });

  test('Feed with participants', () => {
    const wrapper = Enzyme.shallow(
      <Feed
        offset={0}
        moments={[]}
        onMessageRender={function () {}}
        currentChannel="host"
        appendingMessage={false}
        animatingMoment={false}
        isPlaceholderPresent={false}
        hasParticipants={true}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
      />
    );
    expect(wrapper.find(FeedActionBanner).length).toBe(1);
  });
});
