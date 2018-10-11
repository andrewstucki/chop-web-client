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
        appendingMessage={false}
        closeMessageTray={() => {}}
        openMessageTray={() => {}}
        deleteMessage={() => {}}
        toggleCloseTrayButton={() => {}}
        muteUser={() => {}}
      />
    );
    expect(wrapper.find('div').last().text()).toEqual('Go west young man!');
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
        appendingMessage={false}
        closeMessageTray={() => {}}
        openMessageTray={openTray}
        deleteMessage={() => {}}
        toggleCloseTrayButton={() => {}}
        muteUser={() => {}}
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
        appendingMessage={false}
        closeMessageTray={closeTray}
        openMessageTray={() => {}}
        deleteMessage={() => {}}
        toggleCloseTrayButton={() => {}}
        muteUser={() => {}}
      />
    );
    expect(wrapper.find('button').length).toBe(1);
    wrapper.find('button').at(0).simulate('click');
    expect(closeTray.calledOnce).toEqual(true);
  });
});
