// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import VideoFeed from '../../src/videoFeed/videoFeed';

Enzyme.configure({ adapter: new Adapter() });

describe.skip('VideoFeed tests', () => {
  test('VideoFeed shows video', () => {
    const wrapper = Enzyme.shallow(
      <VideoFeed useIframe={false} isVideoHidden={false} url="" />
    );
    expect(wrapper.find('.showVideo').type()).toEqual('div');
  });

  test('VideoFeed hides video', () => {
    const wrapper = Enzyme.shallow(
      <VideoFeed useIframe={false} isVideoHidden={true} url="" />
    );
    expect(wrapper.find('.hideVideo').type()).toEqual('div');
  });
});

