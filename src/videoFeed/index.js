// @flow
import { connect } from 'react-redux';

import VideoFeed from './videoFeed';

import {
  videoType,
  videoStartAtTime,
} from '../selectors/videoSelectors';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    isVideoHidden: feedState.isVideoHidden,
    url: feedState.video.url,
    playerType: videoType(feedState),
    startAt: videoStartAtTime(feedState, Date.now()),
  };
};

const VisibleVideoFeed = connect(
  mapStateToProps
)(VideoFeed);

export default VisibleVideoFeed;
