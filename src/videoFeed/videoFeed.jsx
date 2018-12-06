/* @flow*/
import React from 'react';
import styles from './styles.css';
import Player from './player';
import {
  IFRAME_PLAYER,
  PlayerTypes,
} from '../selectors/videoSelectors';

type VideoFeedProps = {
  isVideoHidden: boolean,
  url: string,
  playerType: PlayerTypes,
  startAt: number,
};

type SimVideoPlayerProps = {
  style: string,
  url: string,
  startAt: number,
  playerType: PlayerTypes,
};

type VideoPlayerProps = {
  style: string,
  url: string,
};

type VideoPlayerWrapperProps = {
  style: string,
  url: string,
  playerType: PlayerTypes,
  startAt: number,
};

const Iframe = ({style, url}: VideoPlayerProps) => (
  <iframe
    className={style}
    src={url}
    width="100%"
    frameBorder="0"
  ></iframe>
);

const VideoJSPlayer = ({style, url, startAt, playerType}: SimVideoPlayerProps) => (
  <div className={style}>
    <Player url={url} startAt={startAt} playerType={playerType} />
  </div>
);

const VideoPlayer = ({playerType, style, url, startAt}: VideoPlayerWrapperProps) => {
  if (playerType === IFRAME_PLAYER) {
    return (
      <Iframe url={url} style={style} />
    );
  } else {
    return (
      <VideoJSPlayer url={url} style={style} startAt={startAt} playerType={playerType} />
    );
  }
};

const VideoFeed = ({isVideoHidden, url, playerType, startAt}: VideoFeedProps) => {
  const style = isVideoHidden ?
    styles.hideVideo :
    styles.showVideo;

  return (
    <div className={style}>
      { url !== '' &&
        <VideoPlayer playerType={playerType} style={styles.frame} url={url} startAt={startAt} />
      }
    </div>

  );
};

export default VideoFeed;
