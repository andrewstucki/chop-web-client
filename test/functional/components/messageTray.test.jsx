// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import MessageTray from '../../../src/components/messageTray';

Enzyme.configure({ adapter: new Adapter() });

describe('MessageTray tests', () => {
  test('MessageTray has buttons', () => {
    const wrapper = Enzyme.shallow(
      <MessageTray />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('messageTray');
    expect(wrapper.find('button').at(0).props().className).toEqual('directChatButton');
    expect(wrapper.find('button').at(1).props().className).toEqual('deleteButton');
    expect(wrapper.find('button').at(2).props().className).toEqual('muteButton');
  });
});
