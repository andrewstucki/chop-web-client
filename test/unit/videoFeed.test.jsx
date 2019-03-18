// @flow
import React from 'react';
import { default as ConnectedVideoFeed } from '../../src/videoFeed';
import VideoFeed from '../../src/videoFeed/videoFeed';
import { defaultState } from '../../src/feed/dux';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import { renderWithReduxAndTheme } from '../testUtils';

describe('VideoFeed tests', () => {
  test('VideoFeed shows video', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <VideoFeed
        Player={YouTubePlayer}
        isVideoHidden={false}
        url="https://life.church/video"
        startAt={0}
        isMobileDevice={false}
        isVideoPlaying={true}
        onPause={() => {}}
        onPlay={() => {}}
        type='simulated'
      />
    );

    const videoFeed = getByTestId('videoFeed');
    expect(videoFeed).toBeTruthy();
    expect(getComputedStyle(videoFeed).display).toEqual('block');
  });

  test('VideoFeed hides video', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <VideoFeed
        Player={YouTubePlayer}
        isVideoHidden={true}
        url="https://life.church/video"
        startAt={0}
        isMobileDevice={false}
        isVideoPlaying={true}
        onPause={() => {}}
        onPlay={() => {}}
        type='simulated'
      />
    );

    const videoFeed = getByTestId('videoFeed');
    expect(videoFeed).toBeTruthy();
    expect(getComputedStyle(videoFeed).display).toEqual('none');
  });

  test ('VideoFeed does not render if url is not set', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <VideoFeed
        Player={YouTubePlayer}
        isVideoHidden={false}
        url=""
        startAt={0}
        isMobileDevice={false}
        isVideoPlaying={true}
        onPause={() => {}}
        onPlay={() => {}}
        type=''
      />
    );
    expect(queryByTestId('videoFeed')).toBeFalsy();
  });

  test('Simulated video renders simulated player', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <ConnectedVideoFeed />,
      {
        feed: {
          ...defaultState,
          video: {
            type: 'simulated',
            url: 'https://www.youtube.com/embed/iGwawktAMRg',
          },
        },
      }
    );

    expect(getByTestId('simulatedLivePlayer')).toBeTruthy();
  });

  test('Offline video renders offline player', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <ConnectedVideoFeed />,
      {
        feed: {
          ...defaultState,
          video: {
            type: 'offline',
            url: 'https://www.wistia.com/embed/iGwawktAMRg',
          },
        },
      }
    );

    expect(getByTestId('offlinePlayer')).toBeTruthy();
  });

  test('Live video renders iframe player', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <ConnectedVideoFeed />,
      {
        feed: {
          ...defaultState,
          video: {
            type: 'live',
            url: 'https://player.vimeo.com/video/1234567890',
          },
        },
      }
    );

    expect(getByTestId('iframePlayer')).toBeTruthy();
  });
});

