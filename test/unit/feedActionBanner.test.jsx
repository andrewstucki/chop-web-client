// @flow
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme from 'enzyme';
import sinon from 'sinon';

import { removeChannel } from '../../src/feed/dux';
import FeedActionBanner from '../../src/feed/feedActionBanner';

Enzyme.configure({ adapter: new Adapter() });

describe('FeedActionBanner test', () => {
  test('Leave direct chat banner renders', () => {
    const wrapper = Enzyme.shallow(
      <FeedActionBanner
        data={
          {
            type: 'LEAVE_DIRECT_CHAT',
            channel: 'host',
          }
        }
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('feedActionBanner');
    expect(wrapper.find('button').at(0).props().className).toEqual('action');
    expect(wrapper.find('button').at(0).text()).toEqual('Leave');
    // TODO simulate a button click
    // TODO find a way to add a channel other than host or public and remove it in a test
  });

  test('Cancel direct chat banner renders', () => {
    const wrapper = Enzyme.shallow(
      <FeedActionBanner
        data={
          {
            type: 'CANCEL_DIRECT_CHAT',
            channel: 'host',
          }
        }
      />
    );
    expect(wrapper.find('div').at(0).props().className).toEqual('feedActionBanner');
    expect(wrapper.find('button').at(0).props().className).toEqual('action');
    expect(wrapper.find('button').at(0).text()).toEqual('Cancel');
    // TODO simulate a button click
  });
});
