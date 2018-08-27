// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';

import ReactionButton from '../../src/reactionButton';

Enzyme.configure({ adapter: new Adapter() });

describe('ReactionButton tests', () => {
  test('ReactionButton renders', () => {
    const wrapper = Enzyme.shallow(
      <ReactionButton />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('container');
    expect(wrapper.find('button').at(0).props().className).toEqual(
      'reactionButton'
    );
  });
});
