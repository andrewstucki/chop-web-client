// @flow
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Placeholder from '../../src/placeholder/placeholder';
import AnchorMoment from '../../src/placeholder/anchorMoment';

Enzyme.configure({ adapter: new Adapter() });

describe('Placeholder tests', () => {
  test('Placeholder renders a CallToChrist anchorMoment', () => {
    const wrapper = Enzyme.shallow(
      <Placeholder
        data={
          {
            type: 'CALL_TO_CHRIST',
            text: 'Would you like to give your life to Christ?',
            subText: 'hand raised',
            showReleaseAnchorButton: true,
          }
        }
        renderPlaceholder={true}
        releaseAnchorMoment={() => {}}
      />
    );
    expect(wrapper.find(AnchorMoment).length).toBe(1);
    expect(wrapper.find(AnchorMoment).at(0).props().anchorMoment).toEqual(
      {
        type: 'CALL_TO_CHRIST',
        text: 'Would you like to give your life to Christ?',
        subText: 'hand raised',
        showReleaseAnchorButton: true,
      }
    );
  });
});
