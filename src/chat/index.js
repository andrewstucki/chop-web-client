// @flow
import { connect } from 'react-redux';

import {
  toggleChatFocus,
  getPlaceholder,
} from './dux';

import { publishMessage } from '../moment';

import Chat from './chat';
import { getCurrentUserAsSharedUser } from '../feed/dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    focused: feedState.isChatFocused,
    currentPlaceholder: getPlaceholder(feedState),
    currentUser: getCurrentUserAsSharedUser(feedState),
    currentChannel: feedState.currentChannel,
  };
};

const mapDispatchToProps = dispatch => (
  {
    textOnBlur: () => dispatch(toggleChatFocus(false)),
    textOnFocus: () => dispatch(toggleChatFocus(true)),
    publishMessage: (channel, text, user) => dispatch(
      publishMessage(channel, text, user)
    ),
  }
);

const VisibleChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default VisibleChat;
