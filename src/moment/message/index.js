// @flow
import { connect } from 'react-redux';
import Message from './message';
import {
  openMessageTray,
  closeMessageTray,
  deleteMessage,
  toggleCloseTrayButton,
  publishMuteUser,
  directChat,
  publishDeleteMessage,
} from './dux';
import { getCurrentUserAsSharedUser } from '../../feed/dux';
import { publishMuteUserNotification } from '../notification/dux';
import { getHostChannel, getCurrentChannel } from '../../selectors/channelSelectors';
import { mutedNotificationBanner } from '../../banner/dux';
import { getMessageTimestamp } from '../../util';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    currentChannel: getCurrentChannel(feedState),
    hostChannel: getHostChannel(feedState),
    currentUser: getCurrentUserAsSharedUser(feedState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    openMessageTray: id => dispatch(openMessageTray(id)),
    closeMessageTray: id => dispatch(closeMessageTray(id)),
    deleteMessage: (id, channel) => dispatch(deleteMessage(id, channel)),
    publishDeleteMessage: id => dispatch(publishDeleteMessage(id)),
    toggleCloseTrayButton: id => dispatch(toggleCloseTrayButton(id)),
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
