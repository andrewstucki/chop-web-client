// @flow
import { connect } from 'react-redux';
import { closeMenu } from './dux';
import { logout } from '../login/dux';
import { setLanguage } from '../languageSelector/dux';
import SideMenu from './sideMenu';
import { togglePopUpModal } from '../popUpModal/dux';
import { loginType } from '../popUpModal/login/dux';
import { clearSubscriber, hasPermissions } from '../subscriber/dux';
import { loggedOutBanner } from '../banner/dux';
import { guestAuth } from '../auth/dux';

const mapStateToProps = state => {
  const { name:organizationName } = state.feed.organization;
  const { title:eventTitle, description:eventDescription } = state.event;

  return {
    isClosed: state.feed.isSideMenuClosed,
    languageOptions: state.feed.languageOptions,
    organizationName,
    eventTitle,
    eventDescription,
    currentSubscriber: state.subscriber.currentSubscriber,
    currentLanguage: state.feed.currentLanguage,
    authenticated: state.feed.isAuthenticated,
    isHost: hasPermissions(state, ['feed.host.read','feed.host.write']),
  };
};

const mapDispatchToProps = dispatch => (
  {
    close: () => dispatch(closeMenu()),
    logout: () => {
      dispatch(guestAuth());
      dispatch(clearSubscriber());
      dispatch(closeMenu());
      dispatch(loggedOutBanner());
      logout();
    },
    onSwipe: direction => {
      if (direction === 'left') return dispatch(closeMenu());
    },
    setLanguage: language => (dispatch(setLanguage(language))),
    login: () => dispatch(togglePopUpModal(loginType())),
  }
);

const VisibleSideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

export default VisibleSideMenu;
