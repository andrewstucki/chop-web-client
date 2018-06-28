// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import FeedActionBanner from '../../src/feed/feedActionBanner';

Enzyme.configure({ adapter: new Adapter() });

describe('FeedActionBanner test', () => {
  test('FeedActionBanner renders', () => {
    const action = sinon.spy();
    const wrapper = Enzyme.shallow(
      <FeedActionBanner
        text="Leave"
        action={action}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('feedActionBanner');
    expect(wrapper.find('button').at(0).props().className).toEqual('action');
    expect(wrapper.find('button').at(0).text()).toEqual('Leave');
    wrapper.find('button').at(0).simulate('click');
    expect(action.calledOnce).toEqual(true);
  });
});
