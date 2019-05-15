// @flow
import ActionableNotification from './actionableNotification';
import { connect } from 'react-redux';

import { getCurrentUserAsSharedUser } from '../../users/dux';
import { publishAcceptedPrayerRequest } from './dux';
import { getHostChannel } from '../../selectors/channelSelectors';

const mapStateToProps = state => {
  const hostChannel = getHostChannel(state);

  return {
    currentUser: getCurrentUserAsSharedUser(state),
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
