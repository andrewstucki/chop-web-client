// @flow
import ActionableNotification from './actionableNotification';
import { connect } from 'react-redux';

import { getCurrentSubscriberAsSharedSubscriber } from '../../subscriber/dux';
import { publishAcceptedPrayerRequest } from './dux';
import { getHostChannel } from '../../selectors/channelSelectors';

const mapStateToProps = state => ({
  currentSubscriber: getCurrentSubscriberAsSharedSubscriber(state),
  hostChannel: getHostChannel(state),
});

const mapDispatchToProps = dispatch => (
  {
    acceptPrayerRequest: (prayerChannel, hostChannel, subscriber, cancelled) => {
      dispatch(publishAcceptedPrayerRequest(prayerChannel, hostChannel, subscriber, cancelled));
    },
  }
);

const VisibleActionableNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionableNotification);

export default VisibleActionableNotification;
