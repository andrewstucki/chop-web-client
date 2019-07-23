// @flow
import Chat from './chat';
import { connect } from 'react-redux';
import { getChannelById, pendingPrayer } from '../../../selectors/channelSelectors';
import { getSubscriberCountInChannel, hasPermissions } from '../../../subscriber/dux';
import { togglePopUpModal } from '../../../popUpModal/dux';
import { leaveChatType } from '../../../popUpModal/leaveChat/dux';
import { getOtherSubscribers } from '../../../selectors/chatSelectors';

const mapStateToProps = (state, ownProps) => {
  const { channel, hideReactions } = ownProps;
  const { type = '' } = getChannelById(state, channel) || {};
  const subscriberCount = getSubscriberCountInChannel(state, channel) || '';
  const isDirect = state.feed?.channels?.[channel]?.direct;
  const isPlaceholder = state.feed?.channels?.[channel]?.placeholder;
  const [otherSubscriber] = getOtherSubscribers(state, channel);
  const { nickname:otherSubscribersName } = otherSubscriber || '';

  return {
    channel,
    type,
    subscriberCount,
    isDirect,
    otherSubscribersName,
    hideReactions: hideReactions || type === 'prayer',
    isPlaceholder,
    pendingPrayer: pendingPrayer(state, channel),
    isHost: hasPermissions(state, ['feed.host.read','feed.host.write']),
  };
};

const mapDispatchToProps = dispatch => ({
  leaveChannel: () => (dispatch(togglePopUpModal(leaveChatType()))),
});

const VisibleChat = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

export default VisibleChat;
