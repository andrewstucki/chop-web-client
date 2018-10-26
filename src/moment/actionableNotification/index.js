// @flow
import ActionableNotification from './actionableNotification';
import { connect } from 'react-redux';

import { getCurrentUserAsSharedUser } from '../../feed/dux';
import { publishAcceptedPrayerRequest } from './dux';
import { publishPrayerNotification } from '../notification/dux';
import { getHostChannel } from '../../selectors/channelSelectors';

const mapStateToProps = state => {
  const feedState = state.feed;
  const hostChannel = getHostChannel(feedState);

  return {
    currentUser: getCurrentUserAsSharedUser(feedState),
    hostChannel,
  };
};

const mapDispatchToProps = dispatch => (
  {
    acceptPrayerRequest: (user, prayerRequestId, channel) => {
      dispatch(publishAcceptedPrayerRequest(prayerRequestId, channel));
    },
    publishPrayerNotification: (host, guest, channel) => dispatch(
      publishPrayerNotification(host, guest, channel)
    ),
  }
);

const VisibleActionableNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionableNotification);

export default VisibleActionableNotification;
