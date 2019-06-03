// @flow
import { connect } from 'react-redux';
import Message from './message';
import {
  toggleMessageTray,
  deleteMessage,
  publishDeleteMessage,
} from './dux';
import {
  muteSubscriberType,
  togglePopUpModal,
} from '../../popUpModal/dux';
import { addPlaceholderChannel } from '../../feed/dux';
import { setPaneToChat } from '../../pane/content/chat/dux';
import { PRIMARY_PANE } from '../../pane/dux';
import { hasPermissions } from '../../subscriber/dux';

const mapStateToProps = (state, ownProps) => {
  const { currentChannel, isCompact } = ownProps;
  return {
    currentChannel,
    isCompact,
    chatPermissions: hasPermissions(state, ['feed.direct.create']),
    moderationPermissions: hasPermissions(state, ['feed.subscribers.mute', 'feed.message.delete'], true),
  };
};

const mapDispatchToProps = dispatch => (
  {
    toggleMessageTray: (channel, id) => dispatch(toggleMessageTray(channel, id)),
    deleteMessage: (id, channel) => dispatch(deleteMessage(id, channel)),
    publishDeleteMessage: id => dispatch(publishDeleteMessage(id)),
    muteSubscriber: (subscriber, currentChannel) => dispatch(togglePopUpModal(muteSubscriberType(subscriber, currentChannel))),
    addPlaceholderChannel: otherSubscriber => {
      const addPlaceholderChannelAction = addPlaceholderChannel(otherSubscriber);
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
