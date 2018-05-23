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

const mapDispatchToProps = dispatch => (
  {
    dispatch: dispatch
  }
);

const VisibleVideoFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoFeed);

export default VisibleVideoFeed;
