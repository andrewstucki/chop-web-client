// @flow
import { connect } from 'react-redux';
import { getCurrentUserAsPrivateUser } from '../feed/dux';

import { closeMenu, logout } from './dux';
// TODO: Remove publishPrayerRequestNotification after demo
import {
  publishPrayerRequestNotification,
} from '../moment/actionableNotification/dux';

import SideMenu from './sideMenu';

// TODO remove currentUser and publishPrayerRequestNotification after demo
const mapStateToProps = state => {
  const sideMenuState = state.sideMenu;
  const feedState = state.feed;
  return {
    isClosed: sideMenuState.closed,
    currentUser: getCurrentUserAsPrivateUser(feedState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    close: () => dispatch(closeMenu()),
    logout: () => dispatch(logout()),
    onSwipe: direction => {
      if (direction === 'left') return dispatch(closeMenu());
    },
    publishPrayerRequestNotification: user => dispatch(
      publishPrayerRequestNotification(user)
    ),
  }
);

const VisibleSideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

export default VisibleSideMenu;
