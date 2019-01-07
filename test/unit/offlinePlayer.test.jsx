// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import OfflinePlayer from '../../src/videoFeed/players/offlinePlayer';
import IframeEmbedPlayer from '../../src/videoFeed/players/iframeEmbedPlayer';

Enzyme.configure({ adapter: new Adapter() });

describe('Offline Player tests', () => {
  test('renders the correct Player', () => {
    const wrapper = Enzyme.shallow(
      <OfflinePlayer
        url='https://youtube.com/embed/123456'
        style='style'
        Player={YouTubePlayer}/>
    );

    expect(wrapper.find(YouTubePlayer).exists()).toBe(true);
  });

  test('renders IFramePlayer when no Player provided', () => {
    const wrapper = Enzyme.shallow(
      <OfflinePlayer
        url='https://youtube.com/embed/123456'
        style='style'
        Player={null}/>
    );

    expect(wrapper.find(IframeEmbedPlayer).exists()).toBe(true);
  });
});
