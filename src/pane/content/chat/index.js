//@flow
import { connect } from 'react-redux';
import Chat from './chat';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { channel } = ownProps;
  return {
    channel: channel || feedState.currentChannel,
  };
};

const VisibleChat = connect(
  mapStateToProps
)(Chat);

export default VisibleChat;
