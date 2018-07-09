// @flow
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import AnchorMoment from '../../src/placeHolder/anchorMoment';

Enzyme.configure({ adapter: new Adapter() });

describe('AnchorMoment tests', () => {
  test('AnchorMoment renders call to Christ', () => {
    const wrapper = Enzyme.shallow(
      <AnchorMoment
        anchorMoment={
          {
            type: 'ANCHOR_MOMENT',
            anchorMomentType: 'CALL_TO_CHRIST',
            id: '12345',
            text: 'Would you like to give your life to Christ?',
            subText: '1 hand raised',
            showReleaseAnchorButton: true,
          }
        }
        releaseAnchorMoment={() => {}}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('anchorMoment');
    expect(wrapper.find('div').at(2).text()).toEqual(
      'Would you like to give your life to Christ?'
    );
    expect(wrapper.find('div').at(3).text()).toEqual('1 hand raised');
  });

  test('AnchorMoment has a close button and it can be clicked', () => {
    const releaseAnchorMoment = sinon.spy();
    const wrapper = Enzyme.shallow(
      <AnchorMoment
        anchorMoment={
          {
            type: 'ANCHOR_MOMENT',
            anchorMomentType: 'CALL_TO_CHRIST',
            id: '12345',
            text: 'Would you like to give your life to Christ?',
            subText: '4 hands raised',
            showReleaseAnchorButton: true,
          }
        }
        releaseAnchorMoment={releaseAnchorMoment}
      />
    );
    expect(wrapper.find('button').at(0).props().className).toEqual('releaseAnchorButton');
    wrapper.find('button').simulate('click');
    expect(releaseAnchorMoment.calledOnce).toEqual(true);
  });
});
