// @flow
import { connect } from 'react-redux';

import {
  toggleChatFocus,
} from './dux';

import {
  getPlaceholder,
} from '../selectors/chatSelectors';

import { publishMessage } from '../moment';

import Chat from './chat';
import { getCurrentUserAsSharedUser } from '../feed/dux';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  return {
    focused: feedState.isChatFocused,
    currentPlaceholder: getPlaceholder(feedState, ownProps.channel),
    currentUser: getCurrentUserAsSharedUser(feedState),
    currentChannel: ownProps.channel,
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
