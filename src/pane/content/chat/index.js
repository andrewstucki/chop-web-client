// @flow
import Chat from './chat';
import { connect } from 'react-redux';
import { getChannelById } from '../../../selectors/channelSelectors';
import { getUserCountInChannel } from '../../../users/dux';
import {
  togglePopUpModal,
  leaveChatType,
} from '../../../popUpModal/dux';
import { getOtherUsers } from '../../../selectors/chatSelectors';

const mapStateToProps = (state, ownProps) => {
  const { channel, hideReactions } = ownProps;
  const { type = '' } = getChannelById(state, channel) || {};
  const userCount = getUserCountInChannel(state, channel) || '';
  const isDirect = state.feed?.channels?.[channel]?.direct;
  const isPlaceholder = state.feed?.channels?.[channel]?.placeholder;
  const [otherUser] = getOtherUsers(state, channel);
  const { name:otherUsersName } = otherUser || '';

  return {
    channel,
    type,
    userCount,
    isDirect,
    otherUsersName,
    hideReactions,
    isPlaceholder,
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
