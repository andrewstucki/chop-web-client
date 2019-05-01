// @flow
import Chat from './chat';
import { connect } from 'react-redux';
import { getChannelById } from '../../../selectors/channelSelectors';
import { getUserCountInChannel } from '../../../selectors/hereNowSelector';
import { 
  togglePopUpModal,
  leaveChatType, 
} from '../../../popUpModal/dux';
import { getOtherUsers } from '../../../selectors/chatSelectors';

const mapStateToProps = (state, ownProps) => {
  const { channel, hideReactions } = ownProps;
  const { feed:feedState } = state;
  const { name = '' } = getChannelById(feedState, channel) || {};
  const userCount = getUserCountInChannel(feedState, channel) || '';
  const isDirect = feedState?.channels?.[channel]?.direct;
  const isPlaceholder = feedState?.channels?.[channel]?.placeholder;
  const [otherUser] = getOtherUsers(feedState, channel);
  const { name:otherUsersName } = otherUser || '';

  return {
    channel,
    name,
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
