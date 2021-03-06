// @flow
import { connect } from 'react-redux';
import { closeMenu } from './dux';
import { setLanguage } from '../languageSelector/dux';
import SideMenu from './sideMenu';
import { togglePopUpModal } from '../popUpModal/dux';
import { profileSettingsType } from '../popUpModal/profileSettings/dux';
import { loginType } from '../popUpModal/login/dux';
import { hasPermissions } from '../subscriber/dux';
import { loggedOutBanner } from '../banner/dux';
import { resetApp } from '../chop/dux';
import { deleteAllCookies } from '../util';

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
    authenticated: state.subscriber.currentSubscriber.email !== '',
    isHost: hasPermissions(state, ['feed.host.read','feed.host.write']),
  };
};

const mapDispatchToProps = dispatch => (
  {
    close: () => dispatch(closeMenu()),
    logout: () => {
      deleteAllCookies();
      dispatch(resetApp());
      dispatch(loggedOutBanner());
    },
    onSwipe: direction => {
      if (direction === 'left') return dispatch(closeMenu());
    },
    setLanguage: language => (dispatch(setLanguage(language))),
    login: () => dispatch(togglePopUpModal(loginType())),
    openSettingsModal: () => {
      dispatch(closeMenu());
      dispatch(togglePopUpModal(profileSettingsType()));
    },
  }
);

const VisibleSideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

export default VisibleSideMenu;
