// @flow
import { connect } from 'react-redux';
import Banner from './banner';
import { getNotificationBanner, clearNotificationBanner } from '../feed/dux';

const mapStateToProps = (state, ownProps) => {
  const feedState = state.feed;
  const { fullWidth = false } = ownProps;
  return {
    banner: getNotificationBanner(feedState),
    fullWidth,
  };
};

const mapDispatchToProps = dispatch => (
  {
    dismissNotification: () => dispatch(clearNotificationBanner()),
  }
);

const VisibleBanner = connect(
  mapStateToProps,
  mapDispatchToProps
)(Banner);

export default VisibleBanner;