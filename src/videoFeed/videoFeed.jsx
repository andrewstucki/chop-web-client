// @flow
import React from 'react';
import styles from './styles.css';
import Player from './youTubePlayer';
//import Player from './vimeoPlayer.jsx';

type VideoFeedProps = {
  isVideoHidden: boolean,
  url: string,
  useIframe: boolean,
};

type VideoPlayerProps = {
  style: string,
  url: string,
}

type VideoPlayerWrapperProps = {
  style: string,
  url: string,
  useIframe: boolean,
}

const Iframe = ({style, url}: VideoPlayerProps) => (
  <iframe
    className={style}
    src={url}
    width="100%"
    frameBorder="0"
  ></iframe>
);

const VideoJSPlayer = ({style, url}: VideoPlayerProps) => (
  <div className={style}>
    <Player url={url}/>
  </div>
);

const VideoPlayer = ({useIframe, style, url}: VideoPlayerWrapperProps) => {
  if (useIframe) {
    return (
      <Iframe url={url} style={style} />
    );
  } else {
    return (
      <VideoJSPlayer url={url} style={style} />
    );
  }
};

const VideoFeed = ({isVideoHidden, url, useIframe}: VideoFeedProps) => {
  const style = isVideoHidden ?
    styles.hideVideo :
    styles.showVideo;

  return (
    <div className={style}>
      { url !== '' &&
        <VideoPlayer useIframe={useIframe} style={styles.feed} url={url} />
      }
    </div>
  );
};

export default VideoFeed;
