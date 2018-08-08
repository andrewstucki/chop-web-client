// @flow
import ActionableNotification from './actionableNotification';
import { connect } from 'react-redux';

import { addChannel, inviteToChannel, getCurrentUserAsPrivateUser } from '../../feed/dux';
import { publishAcceptedPrayerRequest } from './dux';
import { publishPrayerNotification } from '../notification/dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    currentUser: getCurrentUserAsPrivateUser(feedState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    acceptPrayerRequest: (user, prayerRequestId) => {
      const dateTime = (new Date()).getTime();
      const channelId = `direct-chat-${dateTime}`;
      dispatch(addChannel(channelId, channelId));
      dispatch(inviteToChannel(user, channelId));
      dispatch(publishAcceptedPrayerRequest(prayerRequestId));
    },
    publishPrayerNotification: (host, guest) => dispatch(
      publishPrayerNotification(host, guest)
    ),
  }
);

const VisibleActionableNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionableNotification);

export default VisibleActionableNotification;
