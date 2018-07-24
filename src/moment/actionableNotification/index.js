// @flow
import ActionableNotification from './actionableNotification';
import { connect } from 'react-redux';
import { addChannel, inviteToChannel } from '../../feed/dux';

const mapStateToProps = () => (
  {}
);

const mapDispatchToProps = dispatch => (
  {
    acceptPrayerRequest: user => {
      const dateTime = (new Date()).getTime();
      const channelId = `direct-chat-${dateTime}`;
      dispatch(addChannel(channelId, channelId));
      dispatch(inviteToChannel(user.id, channelId));
    },
  }
);

const VisibleActionableNotification = connect(
  mapStateToProps,
  mapDispatchToProps
)(ActionableNotification);

export default VisibleActionableNotification;
