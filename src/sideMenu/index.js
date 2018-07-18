// @flow
import { connect } from 'react-redux';

import { closeMenu, logout } from './dux';
import { publishPrayerRequestNotification } from '../moment/actionableNotification/dux';

import SideMenu from './sideMenu';

const mapStateToProps = state => {
  const sideMenuState = state.sideMenu;
  return {
    isClosed: sideMenuState.closed,
  };
};

const mapDispatchToProps = dispatch => (
  {
    close: () => dispatch(closeMenu()),
    logout: () => dispatch(logout()),
    onSwipe: direction => {
      if (direction === 'left') return dispatch(closeMenu());
    },
    publishPrayerRequestNotification: (user, active) => dispatch(
      publishPrayerRequestNotification(user, active)
    ),
  }
);

const VisibleSideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

export default VisibleSideMenu;
