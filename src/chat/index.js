// @flow
import { connect } from 'react-redux';

import {
  setChatFocus,
} from './dux';

import {
  getPlaceholder,
} from '../selectors/chatSelectors';

import { getTranslateLanguage, getChannelById } from '../selectors/channelSelectors';

import { publishMessage } from '../moment';

import Chat from './chat';
import { getCurrentSubscriberAsSharedSubscriber } from '../subscriber/dux';

import { togglePopUpModal } from '../popUpModal/dux';
import { guestNicknameType } from '../popUpModal/guestNickname/dux';

import { setChannelMessage, clearChannelMessage } from '../feed/dux';

const mapStateToProps = (state, ownProps) => {
  const message = getChannelById(state, ownProps.channel)?.message ? getChannelById(state, ownProps.channel).message : '';
  return {
    focused: state.feed.focusedChannel === ownProps.channel,
    currentPlaceholder: getPlaceholder(state, ownProps.channel),
    currentSubscriber: getCurrentSubscriberAsSharedSubscriber(state),
    currentChannel: ownProps.channel,
    hideReactions: ownProps.hideReactions,
    translateLanguage: getTranslateLanguage(state),
    message,
  };
};

const mapDispatchToProps = dispatch => (
  {
    setChatFocus: channel => dispatch(setChatFocus(channel)),
    publishMessage: (channel, text, subscriber, language) => dispatch(
      publishMessage(channel, text, subscriber, language)
    ),
    setNickname: () => dispatch(togglePopUpModal(guestNicknameType())),
    saveMessage: (id, message) => dispatch(setChannelMessage(id, message)),
    clearMessage: id => dispatch(clearChannelMessage(id)),
  }
);

const VisibleChat = connect(
  mapStateToProps,
  mapDispatchToProps
)(Chat);

export default VisibleChat;
