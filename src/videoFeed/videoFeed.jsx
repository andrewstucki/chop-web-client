/* @flow*/
import React from 'react';
import styles from './styles.css';
import type { PlayerPropsType } from './dux';

type VideoFeedProps = {
  isVideoHidden: boolean,
  url: string,
  // $FlowFixMe
  Player: React.ComponentType<PlayerPropsType>,
  startAt: number,
};

const VideoFeed = ({isVideoHidden, url, Player, startAt}: VideoFeedProps) => {
  const wrapperStyle = isVideoHidden ?
    styles.hideVideo :
    styles.showVideo;
  const frameStyle = styles.frame;

  return (
    <div className={wrapperStyle}>
      { url !== '' &&
        <Player url={url} startAt={startAt} style={frameStyle} />
      }
    </div>
  );
};

export default VideoFeed;
