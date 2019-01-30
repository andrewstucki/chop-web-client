// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import YouTubePlayer from 'react-player/lib/players/YouTube';
import SimulatedLivePlayer from '../../src/videoFeed/players/simulatedLivePlayer';

Enzyme.configure({ adapter: new Adapter() });

describe('Simulated Live Player tests', () => {
  test('does not re-render if the URL stays the same', () => {
    const wrapper = Enzyme.shallow(
      <SimulatedLivePlayer
        url='https://youtube.com/embed/123456'
        style='style'
        Player={YouTubePlayer}
        startAt={0}
        onPause={() => {}}
        onPlay={() => {}}
        isVideoPlaying={true}
        isMobileDevice={true}
      />
    );

    wrapper.setState({ isReady: true });

    const shouldUpdate = wrapper.instance().shouldComponentUpdate({ url: 'https://youtube.com/embed/123456', startAt: 123 });
    expect(shouldUpdate).toBe(false);
  });

  test('re-renders when the URL changes', () => {
    const wrapper = Enzyme.shallow(
      <SimulatedLivePlayer
        url='https://youtube.com/embed/123456'
        style='style'
        Player={YouTubePlayer}
        startAt={0}
        onPause={() => {}}
        onPlay={() => {}}
        isVideoPlaying={true}
        isMobileDevice={true}
      />
    );

    wrapper.setState({ isReady: true });

    const shouldUpdate = wrapper.instance().shouldComponentUpdate({ url: 'https://youtube.com/embed/789012', startAt: 123 });
    expect(shouldUpdate).toBe(true);
  });

  test('does not render when the Player is null', () => {
    const wrapper = Enzyme.shallow(
      <SimulatedLivePlayer
        url='https://youtube.com/embed/123456'
        style='style'
        Player={null}
        startAt={0}
        onPause={() => {}}
        onPlay={() => {}}
        isVideoPlaying={true}
        isMobileDevice={true}
      />
    );

    expect(wrapper.type()).toBe(null);
  });
});
