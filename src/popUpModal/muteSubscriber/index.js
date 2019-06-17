// @flow
import { connect } from 'react-redux';

import { publishMuteSubscriberNotification } from '../../moment/notification/dux';
import { mutedBanner } from '../../banner/dux';
import { publishMuteSubscriber, getCurrentSubscriberAsSharedSubscriber } from '../../subscriber/dux';
import { getMessageTimestamp } from '../../util';
import {
  getHostChannel,
} from '../../selectors/channelSelectors';

import MuteSubscriber from './muteSubscriber';

const mapStateToProps = (state, ownProps) => ({
  hostChannel: getHostChannel(state),
  channelId: ownProps.channelId,
  currentSubscriber: getCurrentSubscriberAsSharedSubscriber(state).nickname,
});

const mapDispatchToProps = dispatch => (
  {
    muteSubscriber: (channel, nickname) => dispatch(publishMuteSubscriber(channel, nickname)),
    publishMuteSubscriberNotification: (host, guest, channel) => dispatch(publishMuteSubscriberNotification(host, guest, channel, getMessageTimestamp())),
    mutednBanner: guestName => dispatch(mutedBanner(guestName)),
  }
);

const VisibleMuteSubscriber = connect(
  mapStateToProps,
  mapDispatchToProps
)(MuteSubscriber);

export default VisibleMuteSubscriber;
