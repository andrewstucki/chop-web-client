/* @flow*/
import React from 'react';
import styles from './styles.css';
import type { SimulatedLivePlayerPropsType } from './dux';
import IframeEmbedPlayer from './players/iframeEmbedPlayer';
import SimulatedLivePlayer from './players/simulatedLivePlayer';
import OfflinePlayer from './players/offlinePlayer';

type VideoFeedProps = {
  type: string,
  url: string,
  isVideoHidden: boolean,
  // $FlowFixMe
  Player?: React.ComponentType<SimulatedLivePlayerPropsType>,
  startAt: number,
  onPause: () => void,
  onPlay: () => void,
  isVideoPlaying: boolean,
  isMobileDevice: boolean,
};

class VideoFeed extends React.Component<VideoFeedProps> {
  render () {
    const { type, Player, url, isVideoHidden, isMobileDevice, onPlay, onPause, startAt, isVideoPlaying } = this.props;
    const wrapperStyle = isVideoHidden ?
      styles.hideVideo :
      styles.showVideo;
    const frameStyle = styles.frame;

    return (
      <div className={wrapperStyle}>
        { url !== '' && type === 'simulated' &&
          <SimulatedLivePlayer
            Player={Player}
            url={url}
            startAt={startAt}
            style={frameStyle}
            onPlay={onPlay}
            onPause={onPause}
            isMobileDevice={isMobileDevice}
            isVideoPlaying={isVideoPlaying}
          />
        }

        { url !== '' && type === 'live' &&
          <IframeEmbedPlayer
            url={url}
            style={frameStyle}
          />
        }

        { url !== '' && type === 'offline' &&
          <OfflinePlayer
            url={url}
            style={frameStyle}
            Player={Player}/>
        }
      </div>
    );
  }
}

export default VideoFeed;
