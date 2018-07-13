// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import FeedActionBanner from '../../src/feed/feedActionBanner';

Enzyme.configure({ adapter: new Adapter() });

describe('FeedActionBanner test', () => {
  test('Leave direct chat banner renders', () => {
    const onClick = sinon.spy();
    const wrapper = Enzyme.shallow(
      <FeedActionBanner
        text="Leave"
        action={onClick}
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('feedActionBanner');
    expect(wrapper.find('button').at(0).props().className).toEqual('action');
    expect(wrapper.find('button').at(0).text()).toEqual('Leave');
    wrapper.find('button').at(0).simulate('click');
    expect(onClick.calledOnce).toEqual(true);
  });
});
