// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import VideoFeed from '../../src/videoFeed/videoFeed';
import YouTubePlayer from 'react-player/lib/players/YouTube';

Enzyme.configure({ adapter: new Adapter() });

describe.skip('VideoFeed tests', () => {
  test('VideoFeed shows video', () => {
    const wrapper = Enzyme.shallow(
      <VideoFeed Player={YouTubePlayer} isVideoHidden={false} url="" startAt={0} isMobileDevice={false} isVideoPlaying={true} onPause={() => {}} onPlay={() => {}} type='simulated'/>
    );
    expect(wrapper.find('.showVideo').type()).toEqual('div');
  });

  test('VideoFeed hides video', () => {
    const wrapper = Enzyme.shallow(
      <VideoFeed Player={YouTubePlayer} isVideoHidden={true} url="" startAt={0} isMobileDevice={false} isVideoPlaying={true} onPause={() => {}} onPlay={() => {}} type='simulated' />
    );
    expect(wrapper.find('.hideVideo').type()).toEqual('div');
  });
});

