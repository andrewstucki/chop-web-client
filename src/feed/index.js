// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedContents,
  feedAnchorMoments,
  hasNotSeenLatestMoments,
} from '../selectors/channelSelectors';

import {
  togglePopUpModal,
  updateScrollPosition,
  getScrollPosition,
  setSawLastMomentAt,
} from './dux';
import type {
  DateTimeType,
  ChannelIdType,
} from '../cwc-types';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { channel } = ownProps;
  const scrollPosition = getScrollPosition(feedState, channel);
  return {
    moments: feedContents(feedState, channel),
    anchorMoments: feedAnchorMoments(feedState, channel),
    currentChannel: channel,
    animatingMoment: feedState.renderingAnchorMoment,
    showLeaveChat: feedState?.channels?.[channel]?.direct,
    scrollPosition: getScrollPosition(feedState, channel),
    currentUser: feedState.currentUser,
    showNewMessageButton: hasNotSeenLatestMoments(feedState, channel) && scrollPosition !== -1,
    isChatFocused: feedState.isChatFocused,
  };
};

const mapDispatchToProps = dispatch => (
  {
    togglePopUpModal: () => (dispatch(togglePopUpModal())),
    updateScrollPosition: (scrollPosition, channel) => (dispatch(updateScrollPosition(scrollPosition, channel))),
    setSawLastMomentAt: (timestamp: DateTimeType, channelId: ChannelIdType) => (dispatch(setSawLastMomentAt(timestamp, channelId))),
  }
);

const VisibleFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default VisibleFeed;
