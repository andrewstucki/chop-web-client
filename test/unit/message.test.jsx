// @flow
import Adapter from 'enzyme-adapter-react-16';
import Message from '../../src/moment/message/message';
import { MESSAGE } from '../../src/moment/message/dux';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

const otherUser = {
  id: '12345',
  pubnubToken: '12345',
  name: 'Billy Bob',
  role: {
    label: 'Host',
  },
};

const user = {
  id: '12345',
  name: 'name',
  pubnubToken: '123',
  role: {
    label: '',
  },
};

describe('Message', () => {
  test('has correct text', () => {
    const wrapper = Enzyme.mount(
      <Message
        message={
          {
            type: MESSAGE,
            id: '1234',
            timestamp: 1546570485391,
            lang: 'en',
            text: 'Go to https://live.life.church young man!<script>sinister script</script>',
            sender: otherUser,
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
        mutedNotificationBanner={() => {}}
        hostChannel='host'
        currentUser={user}
      />
    );
    expect(wrapper.find('div.text').first().html()).toEqual('<div data-node="text" class="text">Go to <a target="_blank" class="linkified" href="https://live.life.church">https://live.life.church</a> young man!</div>');
  });

  test('displays the role label', () => {
    const wrapper = Enzyme.mount(
      <Message
        message={
          {
            type: MESSAGE,
            id: '1234',
            timestamp: 1546570485391,
            lang: 'en',
            text: 'Go west young man!',
            sender: otherUser,
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
        mutedNotificationBanner={() => {}}
        hostChannel='host'
        currentUser={user}
      />
    );
    expect(wrapper.find('span.role').first().text()).toEqual('Host');
  });

  test('has a tray open button and it can be clicked', () => {
    const openTray = sinon.spy();
    const wrapper = Enzyme.mount(
      <Message
        message={
          {
            type: MESSAGE,
            id: '1234',
            timestamp: 1546570485391,
            lang: 'en',
            text: 'Go west young man!',
            sender: otherUser,
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
        mutedNotificationBanner={() => {}}
        hostChannel='host'
        currentUser={user}
      />
    );
    expect(wrapper.find('button').length).toBe(5);
    wrapper.find('button').at(0).simulate('click');
    expect(openTray.calledOnce).toEqual(true);
  });
});
