// @flow
import { connect } from 'react-redux';

import VideoFeed from './videoFeed';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    isVideoHidden: feedState.isVideoHidden,
    url: feedState.video.url,
  };
};

const VisibleVideoFeed = connect(
  mapStateToProps
)(VideoFeed);

export default VisibleVideoFeed;
