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
  getOtherSubscribers,
  hasOtherSubscribers,
} from '../../selectors/chatSelectors';

import LeaveChat from './leaveChat';

const mapStateToProps = (state, ownProps) => {
  const currentChannel = getCurrentChannel(state);
  const channel = getChannelById(state, currentChannel);
  return {
    otherSubscriber: getOtherSubscribers(state, currentChannel)[0],
    hasOtherSubscribers: hasOtherSubscribers(state, currentChannel),
    currentSubscriber: state.subscriber.currentSubscriber,
    currentChannel,
    isPlaceholder: channel?.placeholder || false,
    isSmall: ownProps.isSmall,
  };
};

const mapDispatchToProps = dispatch => (
  {
    leaveChannel: (channelId, isPlaceholder) => isPlaceholder ? dispatch(removeChannel(channelId)) : dispatch(leaveChannel(channelId)),
    publishLeftChannelNotification: (name, id, channel, date) => (dispatch(publishLeftChannelNotification(name, id, channel, date))),
  }
);

const VisibleLeaveChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(LeaveChat);

export default VisibleLeaveChat;
