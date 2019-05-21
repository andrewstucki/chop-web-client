// @flow
import { connect } from 'react-redux';

import {
  removeChannel,
  leaveChannel,
} from '../../feed/dux';
import { publishLeftChannelNotification } from '../../moment/notification/dux';
import { 
  getCurrentChannel,
  getChannelById,
} from '../../selectors/channelSelectors';

import {
  getOtherUsers,
  hasOtherUsers,
} from '../../selectors/chatSelectors';

import LeaveChat from './leaveChat';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const currentChannel = getCurrentChannel(feedState);
  const channel = getChannelById(feedState, currentChannel);
  return {
    otherUser: getOtherUsers(feedState, currentChannel)[0],
    hasOtherUsers: hasOtherUsers(feedState, currentChannel),
    currentUser: feedState.currentUser,
    currentChannel,
    isPlaceholder: channel?.placeholder || false,
    isSmall: ownProps.isSmall,
  };
};

const mapDispatchToProps = dispatch => (
  {
    leaveChannel: (channelId, isPlaceholder) => isPlaceholder ? dispatch(removeChannel(channelId)) : dispatch(leaveChannel(channelId)),
    publishLeftChannelNotification: (name, pubnubToken, channel, date) => (dispatch(publishLeftChannelNotification(name, pubnubToken, channel, date))),
  }
);

const VisibleLeaveChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaveChat);

export default VisibleLeaveChat;