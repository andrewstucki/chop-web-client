/* @flow*/
import React from 'react';
import styles from './styles.css';
import Player from './player';
import {
  JW_PLAYER,
  VIDEO_JS_PLAYER,
  IFRAME_PLAYER,
} from '../selectors/videoSelectors';
//import Player from './player.jsx';

type VideoFeedProps = {
  isVideoHidden: boolean,
  url: string,
  playerType: IFRAME_PLAYER | JW_PLAYER | VIDEO_JS_PLAYER,
  startAt: number,
};

type SimVideoPlayerProps = {
  style: string,
  url: string,
  startAt: number,
};

type VideoPlayerProps = {
  style: string,
  url: string,
};

type VideoPlayerWrapperProps = {
  style: string,
  url: string,
  playerType: IFRAME_PLAYER | JW_PLAYER | VIDEO_JS_PLAYER,
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

const VideoJSPlayer = ({style, url, startAt}: SimVideoPlayerProps) => (
  <div className={style}>
    <Player url={url} startAt={startAt}/>
  </div>
);

const VideoPlayer = ({playerType, style, url, startAt}: VideoPlayerWrapperProps) => {
  switch (playerType) {
  case IFRAME_PLAYER:
    return (
      <Iframe url={url} style={style} />
    );
  case JW_PLAYER:
    return (
      null
      // JWPlayer here
    );
  case VIDEO_JS_PLAYER:
    return (
      <VideoJSPlayer url={url} style={style} startAt={startAt} />
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
