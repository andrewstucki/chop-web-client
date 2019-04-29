// @flow
import { connect } from 'react-redux';
import Message from './message';
import {
  openMessageTray,
  closeMessageTray,
  deleteMessage,
  publishDeleteMessage,
} from './dux';
import {
  muteUserType,
  togglePopUpModal,
} from '../../popUpModal/dux';
import { addPlaceholderChannel } from '../../feed/dux';
import { setPaneToChat } from '../../pane/content/chat/dux';
import { PRIMARY_PANE } from '../../pane/dux';

const mapStateToProps = (state, ownProps) => {
  const { currentChannel } = ownProps;
  return {
    currentChannel,
  };
};

const mapDispatchToProps = dispatch => (
  {
    openMessageTray: (channel, id) => dispatch(openMessageTray(channel, id)),
    closeMessageTray: (channel, id) => dispatch(closeMessageTray(channel, id)),
    deleteMessage: (id, channel) => dispatch(deleteMessage(id, channel)),
    publishDeleteMessage: id => dispatch(publishDeleteMessage(id)),
    muteUser: user => dispatch(togglePopUpModal(muteUserType(user))),
    addPlaceholderChannel: otherUser => {
      const addPlaceholderChannelAction = addPlaceholderChannel(otherUser);
      dispatch(addPlaceholderChannelAction);
      return addPlaceholderChannelAction.channel.id;
    },
    setPaneToChat: channelId => dispatch(setPaneToChat(PRIMARY_PANE, channelId)),
  }
);

const VisibleMessage = connect(
  mapStateToProps,
  mapDispatchToProps
)(Message);

export default VisibleMessage;
