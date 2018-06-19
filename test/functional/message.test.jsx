// @flow
import Adapter from 'enzyme-adapter-react-16';
import Message from '../../src/message/message';
import Enzyme from 'enzyme';
import React from 'react';
import sinon from 'sinon';

Enzyme.configure({ adapter: new Adapter() });

describe('Message', () => {
  test('has correct text', () => {
    const wrapper = Enzyme.shallow(
      <Message 
        message={
          {
            id: '1234',
            text: 'Go west young man!',
            user: {
              id: '12345',
              nickname: 'Billy Bob',
            },
            messageTrayOpen: false,
          }
        }
        appendingMessage={false}
        closeMessageTray={() => {}}
        openMessageTray={() => {}}
        deleteMessage={() => {}}
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
            id: '1234',
            text: 'Go west young man!',
            user: {
              id: '12345',
              nickname: 'Billy Bob',
            },
            messageTrayOpen: false,
          }
        }
        appendingMessage={false}
        closeMessageTray={() => {}}
        openMessageTray={openTray}
        deleteMessage={() => {}}
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
            id: '1234',
            text: 'Go west young man!',
            user: {
              id: '12345',
              nickname: 'Billy Bob',
            },
            messageTrayOpen: true,
          }
        }
        appendingMessage={false}
        closeMessageTray={closeTray}
        openMessageTray={() => {}}
        deleteMessage={() => {}}
      />
    );
    expect(wrapper.find('button').length).toBe(1);
    wrapper.find('button').at(0).simulate('click');
    expect(closeTray.calledOnce).toEqual(true);
  });
});
