// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedAnchorMoments,
  hasNotSeenLatestMoments,
  getScroll,
  feedContents,
} from '../selectors/channelSelectors';

import {
  updateScrollPosition,
} from './dux';
import { isAndroid } from '../util';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { channel } = ownProps;
  const numOfMoments = isAndroid() ? -30 : -200;

  return {
    moments: feedContents(feedState, channel).slice(numOfMoments),
    anchorMoments: feedAnchorMoments(feedState, channel),
    currentChannel: channel,
    scroll: getScroll(feedState, channel),
    currentUser: feedState.currentUser,
    showNewMessageButton: hasNotSeenLatestMoments(feedState, channel),
    textMode: feedState.currentUser.preferences.textMode,
  };
};

const mapDispatchToProps = dispatch => (
  {
    updateScrollPosition: (scrollPosition, channel, timestamp) => (dispatch(updateScrollPosition(scrollPosition, channel, timestamp))),
  }
);

const VisibleFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default VisibleFeed;
