// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import MessageTray from '../../../src/components/messageTray';

Enzyme.configure({ adapter: new Adapter() });

describe('MessageTray tests', () => {
  test('MessageTray has buttons', () => {
    const muteUser = sinon.spy();
    const wrapper = Enzyme.shallow(
      <MessageTray
        deleteMessage={() => {}}
        muteUser={muteUser}
        directChat={() => {}}
        closeTray={() => {}}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('tray');
    expect(wrapper.find('button').at(0).props().className).toEqual('closeButton');
    expect(wrapper.find('button').at(1).props().className).toEqual('muteButton');
    expect(wrapper.find('button').at(2).props().className).toEqual('deleteButton');
    expect(wrapper.find('button').at(3).props().className).toEqual('directChatButton');
  });

  test('Can click delete', () => {
    const deleteMessage = sinon.spy();
    const muteUser = sinon.spy();
    const wrapper = Enzyme.mount(
      <MessageTray
        deleteMessage={deleteMessage}
        muteUser={muteUser}
        directChat={() => {}}
        closeTray={() => {}}
      />
    );

    wrapper.find('button.deleteButton').first().simulate('click');
    expect(deleteMessage.calledOnce).toEqual(true);
  });
});
