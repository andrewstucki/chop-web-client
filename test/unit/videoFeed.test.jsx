// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import VideoFeed from '../../src/videoFeed/videoFeed';

Enzyme.configure({ adapter: new Adapter() });

describe('VideoFeed tests', () => {
  test('VideoFeed shows video', () => {
    const wrapper = Enzyme.shallow(
      <VideoFeed isVideoHidden={false} url="" />
    );
    expect(wrapper.find('.showVideo').type()).toEqual('div');
  });

  test('VideoFeed hides video', () => {
    const wrapper = Enzyme.shallow(
      <VideoFeed isVideoHidden={true} url="" />
    );
    expect(wrapper.find('.hideVideo').type()).toEqual('div');
  });

  test('VideoFeed hides video', () => {
    const wrapper = Enzyme.mount(
      <VideoFeed
        isVideoHidden={false}
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />
    );
    expect(wrapper.find('iframe').props().src)
      .toEqual('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  });
});

