// @flow
import Adapter from 'enzyme-adapter-react-16';
import Message from '../../src/message/message';
import Enzyme from 'enzyme';
import React from 'react';

Enzyme.configure({ adapter: new Adapter() });

describe('Message', () => {
  test('has correct text', () => {
    const wrapper = Enzyme.shallow(
      <Message 
        message={
          {
            id: '1234',
            message: 'Go west young man!',
            user: {
              id: '12345',
              nickname: 'Billy Bob',
            },
            messageTrayOpen: false,
          }
        }
        appendingMessage={false}
        trayButtonOnClick={() => {}}
      />
    );
    expect(wrapper.find('div').last().text()).toEqual('Go west young man!');
  });

  test('has a menu button', () => {
    const wrapper = Enzyme.shallow(
      <Message 
        message={
          {
            id: '1234',
            message: 'Go west young man!',
            user: {
              id: '12345',
              nickname: 'Billy Bob',
            },
            messageTrayOpen: false,
          }
        }
        appendingMessage={false}
        trayButtonOnClick={() => {}}
      />
    );
    expect(wrapper.find('button').length).toBe(1);
  });
});
