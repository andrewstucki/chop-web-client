// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import VideoFeed from '../../src/videoFeed/videoFeed';
import YouTubePlayer from '../../src/videoFeed/youTubePlayer';

Enzyme.configure({ adapter: new Adapter() });

describe.skip('VideoFeed tests', () => {
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
    const wrapper = Enzyme.shallow(
      <VideoFeed
        isVideoHidden={false}
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
      />
    );
    expect(wrapper.find(YouTubePlayer).props().url)
      .toEqual('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
  });
});

