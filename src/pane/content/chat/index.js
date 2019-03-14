//@flow
import Chat from './chat';
import { connect } from 'react-redux';
import { getChannelById } from '../../../selectors/channelSelectors';
import { getUsersInChannel } from '../../../selectors/hereNowSelector';
import { togglePopUpModal } from '../../../feed/dux';
import { getOtherUsers } from '../../../selectors/chatSelectors';

const mapStateToProps = (state, ownProps) => {
  const { channel } = ownProps;
  const { feed:feedState } = state;
  const { name } = getChannelById(feedState, channel) || {};
  const userCount = getUsersInChannel(feedState, channel).length || null;
  const isDirect = feedState?.channels?.[channel]?.direct;
  const [otherUser] = getOtherUsers(feedState, channel);
  const { name:otherUsersName } = otherUser || '';

  return {
    channel,
    name,
    userCount,
    isDirect,
    otherUsersName,
  };
};

const mapDispatchToProps = dispatch => ({
  leaveChannel: () => (dispatch(togglePopUpModal())),
});

const VisibleChat = connect(
  mapStateToProps,
  mapDispatchToProps,
)(Chat);

export default VisibleChat;
