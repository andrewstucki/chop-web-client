// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedContents,
  feedAnchorMoments,
  hasNotSeenLatestMoments,
  getScroll,
} from '../selectors/channelSelectors';

import {
  togglePopUpModal,
  updateScrollPosition,
  setSawLastMomentAt,
} from './dux';
import type {
  DateTimeType,
  ChannelIdType,
} from '../cwc-types';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const cacheState = state.cache;
  const { channel } = ownProps;
  return {
    moments: feedContents(feedState, channel),
    anchorMoments: feedAnchorMoments(feedState, channel),
    currentChannel: channel,
    animatingMoment: feedState.renderingAnchorMoment,
    showLeaveChat: feedState?.channels?.[channel]?.direct,
    scroll: getScroll(feedState, cacheState),
    currentUser: feedState.currentUser,
    showNewMessageButton: hasNotSeenLatestMoments(feedState, channel),
    isChatFocused: feedState.isChatFocused,
  };
};

const mapDispatchToProps = dispatch => (
  {
    togglePopUpModal: () => (dispatch(togglePopUpModal())),
    updateScrollPosition: (scrollPosition, channel, timestamp) => (dispatch(updateScrollPosition(scrollPosition, channel, timestamp))),
    setSawLastMomentAt: (timestamp: DateTimeType, channelId: ChannelIdType) => (dispatch(setSawLastMomentAt(timestamp, channelId))),
  }
);

const VisibleFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default VisibleFeed;
