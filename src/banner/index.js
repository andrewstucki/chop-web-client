// @flow
import { connect } from 'react-redux';
import Banner from './banner';
import { clearBanner } from './dux';
import { getNotificationBanner } from '../feed/dux';

const mapStateToProps = (state, ownProps) => {
  const { fullWidth = false } = ownProps;
  return {
    banner: getNotificationBanner(state),
    fullWidth,
    name: state.subscriber.currentSubscriber.nickname,
  };
};

const mapDispatchToProps = dispatch => (
  {
    dismissNotification: () => dispatch(clearBanner()),
  }
);

const VisibleBanner = connect(
  mapStateToProps,
  mapDispatchToProps
)(Banner);

export default VisibleBanner;