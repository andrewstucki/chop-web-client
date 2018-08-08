// @flow
import { connect } from 'react-redux';

import {
  toggleChatFocus,
  getPlaceholder,
} from './dux';

import { publishMessage } from '../moment';

import Chat from './chat';

const mapStateToProps = state => {
  const chatState = state.chat;
  const feedState = state.feed;
  return {
    textValue: chatState.currentInput,
    focused: chatState.focused,
    currentPlaceholder: getPlaceholder(feedState),
    currentUser: feedState.currentUser,
    currentChannel: feedState.currentChannel,
  };
};

const mapDispatchToProps = dispatch => (
  {
    textOnBlur: () => dispatch(toggleChatFocus(false)),
    textOnFocus: () => dispatch(toggleChatFocus(true)),
    publishMessage: (channel, text, user) => dispatch(publishMessage(channel, text, user)),
  }
);

const VisibleChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default VisibleChat;
