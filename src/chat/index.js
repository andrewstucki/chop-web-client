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
    const message = createMessage(messageText);
    dispatch(addToCurrentChannel(message))
};

const mapDispatchToProps = dispatch => (
  {
    textOnInput: event => dispatch(chatInput(event.target.value)),
    textOnBlur: () => dispatch(toggleChatFocus(false)),
    textOnFocus: () => dispatch(toggleChatFocus(true)),
    buttonOnClick: () => dispatch(sendMessage()),
    enterDetect: event => {
      if (event.charCode === 13) {
        
        return dispatch(sendMessage());
      }
    },
  }
);

const VisibleChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default VisibleChat;
