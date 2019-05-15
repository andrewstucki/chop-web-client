// @flow
import { connect } from 'react-redux';

import { publishMuteUserNotification } from '../../moment/notification/dux';
import { mutedNotificationBanner } from '../../banner/dux';
import { publishMuteUser, getCurrentUserAsSharedUser } from '../../users/dux';
import { getMessageTimestamp } from '../../util';
import { 
  getHostChannel,
  getCurrentChannel,
} from '../../selectors/channelSelectors';

import MuteUser from './muteUser';

const mapStateToProps = state => ({
  hostChannel: getHostChannel(state),
  currentChannel: getCurrentChannel(state),
  currentUser: getCurrentUserAsSharedUser(state).name,
});

const mapDispatchToProps = dispatch => (
  {
    muteUser: (channel, nickname) => dispatch(publishMuteUser(channel, nickname)),
    publishMuteUserNotification: (host, guest, channel) => dispatch(publishMuteUserNotification(host, guest, channel, getMessageTimestamp())),
    mutedNotificationBanner: guestName => dispatch(mutedNotificationBanner(guestName)),
  }
);

const VisibleMuteUser = connect(
  mapStateToProps,
  mapDispatchToProps
)(MuteUser);

export default VisibleMuteUser;
