// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import PopUpModal from '../../../src/components/popUpModal';

Enzyme.configure({ adapter: new Adapter() });

describe('PopUpModal tests', () => {
  test('Modal has background and popup', () => {
    const wrapper = Enzyme.shallow(
      <PopUpModal
        alertText=""
        nickname=""
        actionOne={() => {}}
        actionTwo={() => {}}
        actionOneDescription=""
        actionTwoDescription=""
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('popUpModal');
    expect(wrapper.find('div').at(1).props().className).toEqual('alert');
  });

  test('Can receive an alert message and a nickname', () => {
    const wrapper = Enzyme.shallow(
      <PopUpModal
        alertText="Yabba dabba doooooooooooo"
        nickname="Fred"
        actionOne={() => {}}
        actionTwo={() => {}}
        actionOneDescription=""
        actionTwoDescription=""
      />
    );
    expect(wrapper.find('div').at(2).props().className).toEqual('alertText');
    expect(wrapper.find('strong').at(0).props().className).toEqual('nickname');
    expect(wrapper.find('div').at(2).text()).toEqual('Yabba dabba doooooooooooo');
    expect(wrapper.find('strong').at(0).text()).toEqual('Fred?');
  });

  test('Can receive two action descriptions', () => {
    const wrapper = Enzyme.shallow(
      <PopUpModal
        alertText="Yabba dabba doooooooooooo"
        nickname="Fred"
        actionOne={() => {}}
        actionTwo={() => {}}
        actionOneDescription="Leave"
        actionTwoDescription="Stay"
      />
    );
    expect(wrapper.find('button').at(0).props().className).toEqual('actionOne');
    expect(wrapper.find('button').at(0).text()).toEqual('Leave');
    expect(wrapper.find('button').at(1).props().className).toEqual('actionTwo');
    expect(wrapper.find('button').at(1).text()).toEqual('Stay');
  });

  test('Action one can be fired', () => {
    const buttonOneOnClick = sinon.spy();
    const wrapper = Enzyme.shallow(
      <PopUpModal
        alertText="Yabba dabba doooooooooooo"
        nickname="Fred"
        actionOne={buttonOneOnClick}
        actionTwo={() => {}}
        actionOneDescription="Leave"
        actionTwoDescription="Stay"
      />
    );
    expect(wrapper.find('button').at(0).simulate('click'));
    expect(buttonOneOnClick.calledOnce).toEqual(true);
  });

  test('Action two can be fired', () => {
    const buttonTwoOnClick = sinon.spy();
    const wrapper = Enzyme.shallow(
      <PopUpModal
        alertText="Yabba dabba doooooooooooo"
        nickname="Fred"
        actionOne={() => {}}
        actionTwo={buttonTwoOnClick}
        actionOneDescription="Leave"
        actionTwoDescription="Stay"
      />
    );
    expect(wrapper.find('button').at(1).simulate('click'));
    expect(buttonTwoOnClick.calledOnce).toEqual(true);
  });
});
