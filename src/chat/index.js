// @flow
import { connect } from 'react-redux';

import {
  setChatFocus,
} from './dux';

import {
  getPlaceholder,
} from '../selectors/chatSelectors';

import { getTranslateLanguage } from '../selectors/channelSelectors';

import { publishMessage } from '../moment';

import Chat from './chat';
import { getCurrentUserAsSharedUser } from '../users/dux';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  return {
    focused: feedState.focusedChannel === ownProps.channel,
    currentPlaceholder: getPlaceholder(feedState, ownProps.channel),
    currentUser: getCurrentUserAsSharedUser(feedState),
    currentChannel: ownProps.channel,
    hideReactions: ownProps.hideReactions,
    translateLanguage: getTranslateLanguage(feedState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    setChatFocus: channel => dispatch(setChatFocus(channel)),
    publishMessage: (channel, text, user, language) => dispatch(
      publishMessage(channel, text, user, language)
    ),
  }
);

const VisibleChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default VisibleChat;
