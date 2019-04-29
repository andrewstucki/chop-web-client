// @flow
import ActionableNotification from './actionableNotification';
import { connect } from 'react-redux';

import { getCurrentUserAsSharedUser } from '../../users/dux';
import { publishAcceptedPrayerRequest } from './dux';
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
    acceptPrayerRequest: (prayerChannel, hostChannel, user, cancelled) => {
      dispatch(publishAcceptedPrayerRequest(prayerChannel, hostChannel, user, cancelled));
    },
  }
);

const VisibleActionableNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionableNotification);

export default VisibleActionableNotification;
