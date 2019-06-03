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
import { getCurrentSubscriberAsSharedSubscriber } from '../subscriber/dux';

const mapStateToProps = (state, ownProps) => ({
  focused: state.feed.focusedChannel === ownProps.channel,
  currentPlaceholder: getPlaceholder(state, ownProps.channel),
  currentSubscriber: getCurrentSubscriberAsSharedSubscriber(state),
  currentChannel: ownProps.channel,
  hideReactions: ownProps.hideReactions,
  translateLanguage: getTranslateLanguage(state),
});

const mapDispatchToProps = dispatch => (
  {
    setChatFocus: channel => dispatch(setChatFocus(channel)),
    publishMessage: (channel, text, subscriber, language) => dispatch(
      publishMessage(channel, text, subscriber, language)
    ),
  }
);

const VisibleChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default VisibleChat;
