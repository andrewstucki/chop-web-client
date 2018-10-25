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
import { getCurrentChannel } from '../../feed/dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    currentChannel: getCurrentChannel(feedState),
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
  }
);

const VisibleMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default VisibleMessage;
