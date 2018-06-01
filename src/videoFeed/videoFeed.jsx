// @flow
import React from 'react';
import styles from './styles.css';

type VideoFeedProps = {
  isVideoHidden: boolean,
  url: string,
};

const VideoFeed = ({isVideoHidden, url}: VideoFeedProps) => {
  const style = isVideoHidden ? styles.hideVideo : styles.showVideo;
  return (
    <div className={style}>
      <iframe
        className={styles.frame}
        src={url}
        width="100%"
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default VideoFeed;
