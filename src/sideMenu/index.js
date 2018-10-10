// @flow
import { connect } from 'react-redux';
import { getCurrentUserAsSharedUser } from '../feed/dux';

import { closeMenu, logout } from './dux';
import { setLanguage } from '../languageSelector/dux';
// TODO: Remove publishPrayerRequestNotification after demo
import {
  publishPrayerRequestNotification,
} from '../moment/actionableNotification/dux';

import SideMenu from './sideMenu';
import { getChannelByName } from '../util';

// TODO remove currentUser and publishPrayerRequestNotification after demo
const mapStateToProps = state => {
  const feedState = state.feed;
  const hostChannel = Object.keys(feedState.channels).length ? getChannelByName(feedState.channels, 'Host') : '';

  return {
    isClosed: feedState.isSideMenuClosed,
    currentUser: getCurrentUserAsSharedUser(feedState),
    hostChannel,
    languageOptions: feedState.languageOptions,
  };
};

const mapDispatchToProps = dispatch => (
  {
    close: () => dispatch(closeMenu()),
    logout: () => logout(),
    onSwipe: direction => {
      if (direction === 'left') return dispatch(closeMenu());
    },
    publishPrayerRequestNotification: (user, channel) => dispatch(
      publishPrayerRequestNotification(user, channel)
    ),
    setLanguage: language => (dispatch(setLanguage(language))),
  }
);

const VisibleSideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

export default VisibleSideMenu;
