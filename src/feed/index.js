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
  const { channel } = ownProps;
  const numOfMoments = isAndroid() ? -30 : -200;

  return {
    moments: feedContents(state, channel).slice(numOfMoments),
    anchorMoments: feedAnchorMoments(state, channel),
    currentChannel: channel,
    scroll: getScroll(state, channel),
    currentUser: state.user.currentUser,
    showNewMessageButton: hasNotSeenLatestMoments(state, channel),
    textMode: state.user.currentUser.preferences.textMode,
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
