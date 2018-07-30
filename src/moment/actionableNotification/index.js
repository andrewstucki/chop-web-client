// @flow
import ActionableNotification from './actionableNotification';
import { connect } from 'react-redux';

import { addChannel, inviteToChannel } from '../../feed/dux';
import { publishAcceptedPrayerRequest } from './dux';

const mapStateToProps = () => (
  {}
);

const mapDispatchToProps = dispatch => (
  {
    acceptPrayerRequest: (user, prayerRequestId) => {
      const dateTime = (new Date()).getTime();
      const channelId = `direct-chat-${dateTime}`;
      dispatch(addChannel(channelId, channelId));
      dispatch(inviteToChannel(user, channelId));
      dispatch(publishAcceptedPrayerRequest(prayerRequestId));
    },
  }
);

const VisibleActionableNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionableNotification);

export default VisibleActionableNotification;
