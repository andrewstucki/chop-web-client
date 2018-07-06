// @flow
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import sinon from 'sinon';

import Placeholder from '../../src/placeholder/placeholder';
import AnchorMoment from '../../src/placeholder/anchorMoment';

Enzyme.configure({ adapter: new Adapter() });

describe('Placeholder tests', () => {
  test('Placeholder does not render if renderPlaceHolder is false', () => {
    const wrapper = Enzyme.shallow(
      <Placeholder
        data={
          {
            type: 'CALL_TO_CHRIST',
            text: '',
            subText: '',
            action: () => {},
            showReleaseAnchorButton: false,
          }
        }
        renderPlaceholder={false}
        raisedHandCount={0}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('hidePlaceholder');
  });

  test('Placeholder renders a CallToChrist anchorMoment', () => {
    const releaseAnchorMoment = sinon.spy();
    const wrapper = Enzyme.shallow(
      <Placeholder
        data={
          {
            type: 'CALL_TO_CHRIST',
            text: 'Would you like to give your life to Christ?',
            subText: 'hand raised',
            action: releaseAnchorMoment,
            showReleaseAnchorButton: true,
          }
        }
        renderPlaceholder={true}
        raisedHandCount={1}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('showPlaceholder');
    expect(wrapper.find(AnchorMoment).length).toBe(1);
    expect(wrapper.find(AnchorMoment).at(0).props().anchorMoment).toEqual(
      {
        type: 'CALL_TO_CHRIST',
        text: 'Would you like to give your life to Christ?',
        subText: 'hand raised',
        action: releaseAnchorMoment,
        showReleaseAnchorButton: true,
      }
    );
  });
});
