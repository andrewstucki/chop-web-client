/* @flow*/
import React from 'react';
import type { SimulatedLivePlayerPropsType } from '../dux';

type SimulatedLivePlayerState = {
  isReady: boolean,
  duration: number,
};

class SimulatedLivePlayer extends React.Component<SimulatedLivePlayerPropsType, SimulatedLivePlayerState> {
  player: { current: any };
  state: SimulatedLivePlayerState;

  constructor (props: SimulatedLivePlayerPropsType) {
    super(props);
    // $FlowFixMe
    this.player = React.createRef();
    // $FlowFixMe
    this.onReady = this.onReady.bind(this);

    this.state = {
      isReady: false,
      duration: 0,
    };
  }

  shouldComponentUpdate (nextProps:SimulatedLivePlayerPropsType) {
    const { isReady, duration } = this.state;
    const { isVideoPlaying } = this.props;
    if (!isReady || this.props.url !== nextProps.url) {
      return true;
    } else if (!isVideoPlaying && nextProps.isVideoPlaying && nextProps.startAt <= duration) {
      this.player.current.seekTo(nextProps.startAt);
    }
    return false;
  }

  onReady () {
    const duration = this.player.current.getDuration();
    let { startAt } = this.props;

    startAt = startAt >= duration ? duration - 0.1 : startAt;

    this.setState({
      isReady: true,
      duration,
    });

    this.player.current.seekTo(startAt);
  }

  render () {
    const { Player, url, isMobileDevice, style, onPlay, onPause  } = this.props;

    if (Player === null) {
      return null;
    } else {
      return (
        <Player
          // $FlowFixMe
          ref={this.player}
          url={url}
          className={style}
          width='100%'
          height='100%'
          frameBorder='0'
          playing
          controls
          muted={isMobileDevice}
          playsinline
          config={{
            youtube: {
              playerVars: {
                disablekb: 1,
                modestbranding: 1,
              },
            },
            vimeo: {
              iframeParams: {
                portrait: false,
                title: false,
              },
            },
            wistia: {
              options: {
                silentAutoPlay: 'allow',
              },
            },
          }}
          onPlay={onPlay}
          onPause={onPause}
          onDuration={this.onReady}
        />
      );
    }
  }
}

export default SimulatedLivePlayer;
