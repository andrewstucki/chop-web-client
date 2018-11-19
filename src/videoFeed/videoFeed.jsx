// @flow
import React from 'react';
import styles from './styles.css';
import Player from './youTubePlayer';
//import Player from './vimeoPlayer.jsx';

type VideoFeedProps = {
  isVideoHidden: boolean,
  url: string,
};

const VideoFeed = ({isVideoHidden, url}: VideoFeedProps) => {
  const style = isVideoHidden ?
    styles.hideVideo :
    styles.showVideo;

  return (
    <div className={style}>
      { url !== '' &&
        <div className={styles.frame}>
          <Player url={url} />
        </div>    
      }
    </div>
  );
};

export default VideoFeed;
