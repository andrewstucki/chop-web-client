// @flow
import { connect } from 'react-redux';

import {
  setChatFocus,
  setKeyboardHeight,
} from './dux';

import {
  toggleHideVideo,
} from '../videoFeed/dux';

import {
  getPlaceholder,
} from '../selectors/chatSelectors';

import { publishMessage } from '../moment';

import Chat from './chat';
import { getCurrentUserAsSharedUser } from '../feed/dux';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  return {
    focused: feedState.focusedChannel === ownProps.channel,
    currentPlaceholder: getPlaceholder(feedState, ownProps.channel),
    currentUser: getCurrentUserAsSharedUser(feedState),
    currentChannel: ownProps.channel,
    keyboardHeight: feedState.keyboardHeight,
    hideReactions: ownProps.hideReactions,
  };
};

const mapDispatchToProps = dispatch => (
  {
    setChatFocus: channel => dispatch(setChatFocus(channel)),
    toggleHideVideo: hidden => dispatch(toggleHideVideo(hidden)),
    publishMessage: (channel, text, user) => dispatch(
      publishMessage(channel, text, user)
    ),
    setKeyboardHeight: height => dispatch(setKeyboardHeight(height)),
  }
);

const VisibleChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default VisibleChat;
