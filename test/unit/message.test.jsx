// @flow
import Adapter from 'enzyme-adapter-react-16';
import Message from '../../src/moment/message/message';
import { MESSAGE } from '../../src/moment/message/dux';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

const otherUser = {
  pubnubToken: '12345',
  name: 'Billy Bob',
  role: {
    label: 'Host',
  },
};

const user = {
  name: 'name',
  pubnubToken: '123',
  role: {
    label: '',
  },
};

describe('Message', () => {
  test('has correct text', () => {
    const wrapper = Enzyme.shallow(
      <Message 
        message={
          {
            type: MESSAGE,
            id: '1234',
            lang: 'en',
            text: 'Go west young man!',
            user: otherUser,
            messageTrayOpen: false,
            closeTrayButtonRendered: false,
          }
        }
        currentChannel='public'
        closeMessageTray={() => {}}
        openMessageTray={() => {}}
        deleteMessage={() => {}}
        publishDeleteMessage={() => {}}
        toggleCloseTrayButton={() => {}}
        muteUser={() => {}}
        directChat={() => {}}
        publishMuteUserNotification={() => {}}
        hostChannel='host'
        currentUser={user}
      />
    );
    expect(wrapper.find('div').last().text()).toEqual('Go west young man!');
  });

  test('displays the role label', () => {
    const wrapper = Enzyme.shallow(
      <Message 
        message={
          {
            type: MESSAGE,
            id: '1234',
            lang: 'en',
            text: 'Go west young man!',
            user: otherUser,
            messageTrayOpen: false,
            closeTrayButtonRendered: false,
          }
        }
        currentChannel='public'
        closeMessageTray={() => {}}
        openMessageTray={() => {}}
        deleteMessage={() => {}}
        publishDeleteMessage={() => {}}
        toggleCloseTrayButton={() => {}}
        muteUser={() => {}}
        directChat={() => {}}
        publishMuteUserNotification={() => {}}
        hostChannel='host'
        currentUser={user}
      />
    );
    expect(wrapper.find('span').last().text()).toEqual('Host');
  });

  test('has a tray open button and it can be clicked', () => {
    const openTray = sinon.spy();
    const wrapper = Enzyme.shallow(
      <Message 
        message={
          {
            type: MESSAGE,
            id: '1234',
            lang: 'en',
            text: 'Go west young man!',
            user: otherUser,
            messageTrayOpen: false,
            closeTrayButtonRendered: false,
          }
        }
        currentChannel='public'
        closeMessageTray={() => {}}
        openMessageTray={openTray}
        deleteMessage={() => {}}
        publishDeleteMessage={() => {}}
        toggleCloseTrayButton={() => {}}
        muteUser={() => {}}
        directChat={() => {}}
        publishMuteUserNotification={() => {}}
        hostChannel='host'
        currentUser={user}
      />
    );
    expect(wrapper.find('button').length).toBe(1);
    wrapper.find('button').at(0).simulate('click');
    expect(openTray.calledOnce).toEqual(true);
  });

  test('has a tray close button and it can be clicked', () => {
    const closeTray = sinon.spy();
    const wrapper = Enzyme.shallow(
      <Message 
        message={
          {
            type: MESSAGE,
            id: '1234',
            lang: 'en',
            text: 'Go west young man!',
            user: otherUser,
            messageTrayOpen: true,
            closeTrayButtonRendered: true,
          }
        }
        currentChannel='public'
        closeMessageTray={closeTray}
        openMessageTray={() => {}}
        deleteMessage={() => {}}
        publishDeleteMessage={() => {}}
        toggleCloseTrayButton={() => {}}
        muteUser={() => {}}
        directChat={() => {}}
        publishMuteUserNotification={() => {}}
        hostChannel='host'
        currentUser={user}
      />
    );
    expect(wrapper.find('button').length).toBe(1);
    wrapper.find('button').at(0).simulate('click');
    expect(closeTray.calledOnce).toEqual(true);
  });
});
