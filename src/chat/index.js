// @flow
import Chat from './chat';
import { connect } from 'react-redux';
import { chatInput, toggleChatFocus, addToCurrentChannel, createMessage } from './ducks';

const mapStateToProps = state => (
  {
    textValue: state.currentInput,
  }
);

const mapDispatchToProps = dispatch => (
  {
    textOnInput: value => dispatch(chatInput(value)),
    textOnBlue: () => dispatch(toggleChatFocus(false)),
    textOnFocus: () => dispatch(toggleChatFocus(true)),
    buttonOnClick: value => dispatch(addToCurrentChannel(createMessage(value))),
  }
);

const VisibleChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default VisibleChat;