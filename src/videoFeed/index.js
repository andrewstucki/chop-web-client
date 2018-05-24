// @flow
import { connect } from 'react-redux';

import VideoFeed from './videoFeed';
import { getChatFocus } from './dux';

const mapStateToProps = state => {
  const videoFeedState = state.videoFeed;
  return {
    isVideoHidden: getChatFocus(videoFeedState),
  };
};

const VisibleVideoFeed = connect(
  mapStateToProps
)(VideoFeed);

export default VisibleVideoFeed;
