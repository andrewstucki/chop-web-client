// @flow
import { connect } from 'react-redux';
import Banner from './banner';
import { getNotificationBanner, clearNotificationBanner } from '../feed/dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    banner: getNotificationBanner(feedState),
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