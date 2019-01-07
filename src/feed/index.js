// @flow
import Feed from './feed';
import { connect } from 'react-redux';
import {
  feedContents,
  feedAnchorMoments,
} from '../selectors/channelSelectors';

import {
  togglePopUpModal,
  updateScrollPosition,
  getScrollPosition,
} from './dux';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { channel } = ownProps;
  return {
    moments: feedContents(feedState, channel),
    anchorMoments: feedAnchorMoments(feedState, channel),
    currentChannel: channel,
    animatingMoment: feedState.renderingAnchorMoment,
    showLeaveChat: feedState?.channels?.[channel]?.direct,
    scrollPosition: getScrollPosition(feedState, channel),
    currentUser: feedState.currentUser,
    showNewMessageButton: false,
    isChatFocused: feedState.isChatFocused,
  };
};

const mapDispatchToProps = dispatch => (
  {
    togglePopUpModal: () => (dispatch(togglePopUpModal())),
    updateScrollPosition: (scrollPosition, channel) => (dispatch(updateScrollPosition(scrollPosition, channel))),
  }
);

const VisibleFeed = connect(
  mapStateToProps,
  mapDispatchToProps
)(Feed);

export default VisibleFeed;
