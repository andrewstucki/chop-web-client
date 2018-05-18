// @flow
import { connect } from 'react-redux';

import VideoFeed from './videoFeed';
import { getChatFocus } from './dux';

const mapStateToProps = state => {
  const videoFeedState = state.videoFeed;
  return {
    isChatFocused: getChatFocus(videoFeedState),
  };
};

const mapDispatchToProps = dispatch => (
  {}
);

const VisibleVideoFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(VideoFeed);

export default VisibleVideoFeed;
