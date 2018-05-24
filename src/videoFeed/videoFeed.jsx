// @flow
import React from 'react';
import styles from './styles.css';

type VideoFeedProps = {
  isVideoHidden: boolean,
};

const VideoFeed = ({isVideoHidden}: VideoFeedProps) => {
  const style = isVideoHidden ? styles.hideVideo : styles.showVideo;
  return (
    <div className={style}>
      <iframe
        className={styles.frame}
        src="https://www.youtube.com/embed/bz2kN31m_S0?rel=0"
        width="550"
        height="281"
        frameborder="0"
      ></iframe>
    </div>
  );
};

export default VideoFeed;
