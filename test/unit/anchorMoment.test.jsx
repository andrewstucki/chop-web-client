// @flow
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import AnchorMoment from '../../src/moment/anchorMoment/anchorMoment';

Enzyme.configure({ adapter: new Adapter() });

describe('AnchorMoment tests', () => {
  test('AnchorMoment renders 1 hand raised banner', () => {
    const wrapper = Enzyme.shallow(
      <AnchorMoment
        text="Would you like to give your life to Christ?"
        raisedHandCount="1"
        showReleaseButton={true}
        releaseAnchorMoment={() => {}}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('anchorMoment');
    expect(wrapper.find('div').at(1).text()).toEqual(
      'Would you like to give your life to Christ?'
    );
    expect(wrapper.find('div').at(2).text()).toEqual('1 hand raised');
  });

  test('AnchorMoment renders multiple hands raised banner', () => {
    const wrapper = Enzyme.shallow(
      <AnchorMoment
        text="Would you like to give your life to Christ?"
        raisedHandCount="4"
        showReleaseButton={true}
        releaseAnchorMoment={() => {}}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('anchorMoment');
    expect(wrapper.find('div').at(1).text()).toEqual(
      'Would you like to give your life to Christ?'
    );
    expect(wrapper.find('div').at(2).text()).toEqual('4 hands raised');
  });

  test('AnchorMoment has a close button and it can be clicked', () => {
    const releaseAnchorMoment = sinon.spy();
    const wrapper = Enzyme.shallow(
      <AnchorMoment
        text="Would you like to give your life to Christ?"
        raisedHandCount="4"
        showReleaseButton={true}
        releaseAnchorMoment={releaseAnchorMoment}
      />
    );
    expect(wrapper.find('button').at(0).props().className).toEqual('releaseAnchorButton');
    wrapper.find('button').simulate('click');
    expect(releaseAnchorMoment.calledOnce).toEqual(true);
  });
});
