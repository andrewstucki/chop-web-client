// @flow
import React from 'react';
import videoFeedStyles from './styles.css';

type VideoFeedProps = {
  isVideoHidden: boolean,
};

const VideoFeed = ({isVideoHidden}: VideoFeedProps) => {
  const style = isVideoHidden ? videoFeedStyles.hideVideo : videoFeedStyles.showVideo;
  return (
    <div className={style}></div>
  );
};

export default VideoFeed;
