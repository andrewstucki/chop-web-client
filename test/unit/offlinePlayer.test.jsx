// @flow
import React from 'react';
import { render } from '@testing-library/react';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import OfflinePlayer from '../../src/videoFeed/players/offlinePlayer';

describe('Offline Player tests', () => {
  test('it renders', () => {
    const { container } = render(
      <OfflinePlayer
        url='https://youtube.com/embed/123456'
        style='style'
        Player={YouTubePlayer}/>
    );

    // react-player doesn't generate the HTML until it's determined it can play the video
    expect(container).toBeTruthy();
  });

  test('renders IFramePlayer when no Player provided', () => {
    const { getByTestId } = render(
      <OfflinePlayer
        url='https://youtube.com/embed/123456'
        style='style'
        Player={null}/>
    );

    expect(getByTestId('iframePlayer')).toBeTruthy();
  });
});
