// @flow
import { connect } from 'react-redux';
import Banner from './banner';
import { clearBanner } from './dux';
import { getNotificationBanner } from '../feed/dux';
import { getCurrentSubscriber } from '../subscriber/dux';

const mapStateToProps = (state, ownProps) => {
  const { fullWidth = false } = ownProps;
  return {
    banner: getNotificationBanner(state),
    fullWidth,
    currentSubscriberNickname: getCurrentSubscriber(state).nickname,
  };
};

const mapDispatchToProps = dispatch => (
  {
    dismissBanner: () => dispatch(clearBanner()),
  }
);

const VisibleBanner = connect(
  mapStateToProps,
  mapDispatchToProps
)(Banner);

export default VisibleBanner;
