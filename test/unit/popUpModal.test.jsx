// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import PopUpModal from '../../src/popUpModal/popUpModal';

Enzyme.configure({ adapter: new Adapter() });

describe('PopUpModal tests', () => {
  test('Modal has background and popup', () => {
    const wrapper = Enzyme.shallow(
      <PopUpModal
        keepChatting={() => {}}
        leaveChat={() => {}}
        user={
          {
            id: '12345',
            nickname: 'Walker, Texas Ranger',
          }
        }
        isPopUpModalVisible={true}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('popUpModal');
    expect(wrapper.find('div').at(1).props().className).toEqual('alert');
    expect(wrapper.find('div').at(2).text()).toEqual(
      'Are you sure you want to end your chat with Walker, Texas Ranger?'
    );
  });

  test('Actions can be fired', () => {
    const buttonOneOnClick = sinon.spy();
    const buttonTwoOnClick = sinon.spy();
    const wrapper = Enzyme.shallow(
      <PopUpModal
        keepChatting={buttonOneOnClick}
        leaveChat={buttonTwoOnClick}
        user={
          {
            id: '12345',
            nickname: 'Walker Texas Ranger',
          }
        }
        isPopUpModalVisible={true}
      />
    );
    expect(wrapper.find('button').at(0).simulate('click'));
    expect(wrapper.find('button').at(1).simulate('click'));
    expect(buttonOneOnClick.calledOnce).toEqual(true);
    expect(buttonTwoOnClick.calledOnce).toEqual(true);
  });
});
