//@flow
import { connect } from 'react-redux';
import Chat from './chat';

const mapStateToProps = (state, ownProps) => {
  const { channel } = ownProps;
  return {
    channel,
  };
};

const VisibleChat = connect(
  mapStateToProps
)(Chat);

export default VisibleChat;
