// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import MessageTray from '../../../src/components/messageTray';

Enzyme.configure({ adapter: new Adapter() });

describe('MessageTray tests', () => {
  test('MessageTray has buttons', () => {
    const wrapper = Enzyme.shallow(
      <MessageTray 
        trayButtonOnClick={() => {}}
        messageTrayOpen={false}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('closed');
    expect(wrapper.find('button').at(0).props().className).toEqual('closeMessageTray');
    expect(wrapper.find('button').at(1).props().className).toEqual('directChatButton');
    expect(wrapper.find('button').at(2).props().className).toEqual('deleteButton');
    expect(wrapper.find('button').at(3).props().className).toEqual('muteButton');
  });

  test('MessageTray opens', () => {
    const wrapper = Enzyme.shallow(
      <MessageTray 
        trayButtonOnClick={() => {}}
        messageTrayOpen={true}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('open');
  });

  test('Close button clickable', () => {
    const onButtonClick = sinon.spy();
    const wrapper = Enzyme.shallow(
      <MessageTray
        trayButtonOnClick={onButtonClick}
        messageTrayOpen={true}
      />
    );
    wrapper.find('button').at(0).simulate('click');
    expect(onButtonClick.calledOnce).toEqual(true);
  });
});
