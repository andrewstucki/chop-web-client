// @flow
import Chat from './chat';
import { connect } from 'react-redux';
import { chatInput, toggleChatFocus, addToCurrentChannel, textEntered, getPlaceholder } from './dux';

const mapStateToProps = state => {
  const chatState = state.chat;
  const feedState = state.feed;
  return {
    textValue: chatState.currentInput,
    focused: chatState.focused,
    textEntered: textEntered(chatState),
    currentPlaceholder: getPlaceholder(feedState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    textOnInput: event => dispatch(chatInput(event.target.value)),
    textOnBlur: () => dispatch(toggleChatFocus(false)),
    textOnFocus: () => dispatch(toggleChatFocus(true)),
    buttonOnClick: () => dispatch(addToCurrentChannel()),
    enterDetect: event => {
      if (event.charCode === 13) {
        return dispatch(addToCurrentChannel());
      }
    },
  }
);

const VisibleChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default VisibleChat;
