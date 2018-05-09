// @flow
import Chat from './chat';
import { connect } from 'react-redux';
import { chatInput, toggleChatFocus, addToCurrentChannel, createMessage, textEntered } from './dux';

const mapStateToProps = state => {
  const chatState = state.chat;
  return {
    textValue: chatState.currentInput,
    focused: chatState.focused,
    textEntered: textEntered(chatState),
  };
};

const sendMessage = () => 
  (dispatch, getState) => {
    const messageText = getState().chat.currentInput;
    dispatch(addToCurrentChannel(createMessage(messageText)));
  };


const mapDispatchToProps = dispatch => (
  {
    textOnInput: event => dispatch(chatInput(event.target.value)),
    textOnBlur: () => dispatch(toggleChatFocus(false)),
    textOnFocus: () => dispatch(toggleChatFocus(true)),
    buttonOnClick: () => dispatch(sendMessage()),
  }
);

const VisibleChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default VisibleChat;