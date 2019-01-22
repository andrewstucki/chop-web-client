// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { default as ConnectedVideoFeed } from '../../src/videoFeed';
import VideoFeed from '../../src/videoFeed/videoFeed';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import VimeoPlayer from 'react-player/lib/players/Vimeo';
import WistiaPlayer from 'react-player/lib/players/Wistia';

Enzyme.configure({ adapter: new Adapter() });

describe('VideoFeed tests', () => {
  test('VideoFeed shows video', () => {
    const wrapper = Enzyme.shallow(
      <VideoFeed Player={YouTubePlayer} isVideoHidden={false} url="https://life.church/video" startAt={0} isMobileDevice={false} isVideoPlaying={true} onPause={() => {}} onPlay={() => {}} type='simulated'/>
    );
    expect(wrapper.find('.showVideo').type()).toEqual('div');
  });

  test('VideoFeed hides video', () => {
    const wrapper = Enzyme.shallow(
      <VideoFeed Player={YouTubePlayer} isVideoHidden={true} url="https://life.church/video" startAt={0} isMobileDevice={false} isVideoPlaying={true} onPause={() => {}} onPlay={() => {}} type='simulated' />
    );
    expect(wrapper.find('.hideVideo').type()).toEqual('div');
  });

  test ('VideoFeed does not render if url is not set', () => {
    const wrapper = Enzyme.shallow(
      <VideoFeed Player={YouTubePlayer} isVideoHidden={false} url="" startAt={0} isMobileDevice={false} isVideoPlaying={true} onPause={() => {}} onPlay={() => {}} type='' />
    );
    expect(wrapper.find('.showVideo').exists()).toEqual(false);
  });

  test('YouTube URL renders YouTube player', () => {
    const store = createStore(
      reducer,
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

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <ConnectedVideoFeed />
      </Provider>
    );

    expect(wrapper.find(YouTubePlayer).exists()).toEqual(true);
  });

  test('Vimeo URL renders Vimeo player', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
          video: {
            type: 'simulated',
            url: 'https://player.vimeo.com/video/50889661',
          },
        },
      }
    );

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <ConnectedVideoFeed />
      </Provider>
    );

    expect(wrapper.find(VimeoPlayer).exists()).toEqual(true);
  });

  test('Wistia URL renders Wistia player', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
          video: {
            type: 'simulated',
            url: 'https://fast.wistia.net/embed/iframe/avk9twrrbn',
          },
        },
      }
    );

    const wrapper = Enzyme.mount(
      <Provider store={store}>
        <ConnectedVideoFeed />
      </Provider>
    );

    expect(wrapper.find(WistiaPlayer).exists()).toEqual(true);
  });

  test('SimulatedLive should only re-render when the URL changes', () => {

  });
});

