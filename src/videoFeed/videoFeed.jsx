// @flow
import React from 'react';
import videoFeedStyles from './styles.css';

type VideoFeedProps = {
  isChatFocused: boolean,
};

const VideoFeed = ({isChatFocused}: VideoFeedProps) => {
  const style = isChatFocused ? videoFeedStyles.hideVideo : videoFeedStyles.showVideo;
  return (
    <div className={style}></div>
  );
};

export default VideoFeed;
