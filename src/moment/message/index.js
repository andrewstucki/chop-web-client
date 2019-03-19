// @flow
import { connect } from 'react-redux';
import Message from './message';
import {
  openMessageTray,
  closeMessageTray,
  deleteMessage,
  publishMuteUser,
  directChat,
  publishDeleteMessage,
} from './dux';
import { getCurrentUserAsSharedUser } from '../../feed/dux';
import { publishMuteUserNotification } from '../notification/dux';
import { getHostChannel } from '../../selectors/channelSelectors';
import { mutedNotificationBanner } from '../../banner/dux';
import { getMessageTimestamp } from '../../util';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { currentChannel } = ownProps;
  return {
    currentChannel,
    hostChannel: getHostChannel(feedState),
    currentUser: getCurrentUserAsSharedUser(feedState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    openMessageTray: (channel, id) => dispatch(openMessageTray(channel, id)),
    closeMessageTray: (channel, id) => dispatch(closeMessageTray(channel, id)),
    deleteMessage: (id, channel) => dispatch(deleteMessage(id, channel)),
    publishDeleteMessage: id => dispatch(publishDeleteMessage(id)),
    muteUser: (channel, nickname) => dispatch(publishMuteUser(channel, nickname)),
    directChat: (pubnubToken, nickname) => dispatch(directChat(pubnubToken, nickname)),
    publishMuteUserNotification: (host, guest, channel) => dispatch(publishMuteUserNotification(host, guest, channel, getMessageTimestamp())),
    mutedNotificationBanner: guestName => dispatch(mutedNotificationBanner(guestName)),
  }
);

const VisibleMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default VisibleMessage;
