// @flow
import { connect } from 'react-redux';
import Message from './message';
import {
  openMessageTray,
  closeMessageTray,
  deleteMessage,
  toggleCloseTrayButton,
  muteUser,
  directChat,
  publishDeleteMessage,
} from './dux';
import { getCurrentChannel, getCurrentUserAsSharedUser } from '../../feed/dux';
import { publishMuteUserNotification } from '../notification/dux';
import { getHostChannel } from '../../selectors/channelSelectors';
import { mutedNotificationBanner } from '../../banner/dux';

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
    muteUser: pubnubToken => dispatch(muteUser(pubnubToken)),
    directChat: pubnubToken => dispatch(directChat(pubnubToken)),
    publishMuteUserNotification: (host, guest, channel, date) => dispatch(publishMuteUserNotification(host, guest, channel, date)),
    mutedNotificationBanner: guestName => dispatch(mutedNotificationBanner(guestName)),
  }
);

const VisibleMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default VisibleMessage;
