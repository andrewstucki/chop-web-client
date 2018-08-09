// @flow
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import AnchorMoment from '../../src/placeHolder/anchorMoment';

Enzyme.configure({ adapter: new Adapter() });

describe('AnchorMoment tests', () => {
  test('Salvation AnchorMoment renders in placeholder', () => {
    const wrapper = Enzyme.shallow(
      <AnchorMoment
        anchorMoment={
          {
            type: 'ANCHOR_MOMENT',
            id: '12345',
            text: 'I commit my life to Christ.',
            subText: '1 hand raised',
          }
        }
        releaseAnchorMoment={() => {}}
        isAnchorMomentAnchored={true}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('anchored');
    expect(wrapper.find('div').at(2).text()).toEqual(
      'I commit my life to Christ.'
    );
    expect(wrapper.find('div').at(3).text()).toEqual('1 hand raised');
  });

  test('Salvation AnchorMoment renders in feed', () => {
    const wrapper = Enzyme.shallow(
      <AnchorMoment
        anchorMoment={
          {
            type: 'ANCHOR_MOMENT',
            id: '12345',
            text: 'I commit my life to Christ.',
            subText: '1 hand raised',
          }
        }
        releaseAnchorMoment={() => {}}
        isAnchorMomentAnchored={false}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('released');
    expect(wrapper.find('div').at(2).text()).toEqual(
      'I commit my life to Christ.'
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
            id: '12345',
            text: 'I commit my life to Christ.',
            subText: '4 hands raised',
          }
        }
        releaseAnchorMoment={releaseAnchorMoment}
        isAnchorMomentAnchored={true}
      />
    );
    expect(wrapper.find('button').at(0).props().className).toEqual('releaseAnchorButton');
    wrapper.find('button').simulate('click');
    expect(releaseAnchorMoment.calledOnce).toEqual(true);
  });
});
