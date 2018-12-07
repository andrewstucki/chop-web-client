// @flow
import { connect } from 'react-redux';

import VideoFeed from './videoFeed';

import {
  videoPlayerFactory,
  videoStartAtTime,
} from './dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    isVideoHidden: feedState.isVideoHidden,
    url: feedState.video.url,
    Player: videoPlayerFactory(feedState),
    startAt: videoStartAtTime(feedState, Date.now()),
  };
};

const VisibleVideoFeed = connect(
  mapStateToProps
)(VideoFeed);

export default VisibleVideoFeed;
