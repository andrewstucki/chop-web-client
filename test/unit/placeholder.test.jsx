// @flow
import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import Placeholder from '../../src/placeholder/placeholder';
import AnchorMoment from '../../src/placeholder/anchorMoment';

Enzyme.configure({ adapter: new Adapter() });

describe('Placeholder tests', () => {
  test('Placeholder renders a salvation anchorMoment', () => {
    const wrapper = Enzyme.shallow(
      <Placeholder
        data={
          {
            type: 'ANCHOR_MOMENT',
            id: '12345',
            text: 'I commit my life to Christ.',
            subText: '1 hand raised',
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
        type: 'ANCHOR_MOMENT',
        id: '12345',
        text: 'I commit my life to Christ.',
        subText: '1 hand raised',
        showReleaseAnchorButton: true,
      }
    );
  });
});
