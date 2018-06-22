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
        actionOne={() => {}}
        actionTwo={() => {}}
        actionOneDescription=""
        actionTwoDescription=""
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('popUpModal');
    expect(wrapper.find('div').at(1).props().className).toEqual('alert');
  });

  test('Can receive children', () => {
    const wrapper = Enzyme.shallow(
      <PopUpModal
        actionOne={() => {}}
        actionTwo={() => {}}
        actionOneDescription=""
        actionTwoDescription=""
      >
        <div>Yabba dabba doooooooo</div>
      </PopUpModal>
    );
    expect(wrapper.find('div').at(2).text()).toEqual('Yabba dabba doooooooo');
  });

  test('Can receive two action descriptions', () => {
    const wrapper = Enzyme.shallow(
      <PopUpModal
        actionOne={() => {}}
        actionTwo={() => {}}
        actionOneDescription="Leave"
        actionTwoDescription="Stay"
      />
    );
    expect(wrapper.find('button').at(0).props().className).toEqual('action');
    expect(wrapper.find('button').at(0).text()).toEqual('Leave');
    expect(wrapper.find('button').at(1).props().className).toEqual('action');
    expect(wrapper.find('button').at(1).text()).toEqual('Stay');
  });

  test('Action one can be fired', () => {
    const buttonOneOnClick = sinon.spy();
    const wrapper = Enzyme.shallow(
      <PopUpModal
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
