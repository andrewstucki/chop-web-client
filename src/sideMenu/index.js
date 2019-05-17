// @flow
import { connect } from 'react-redux';
import { closeMenu, logout } from './dux';
import { setLanguage } from '../languageSelector/dux';
import SideMenu from './sideMenu';
import { removeAuthentication } from '../feed/dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  const { name:organizationName } = feedState.organization;
  const { title:eventTitle, description:eventDescription } = feedState.event;

  return {
    isClosed: feedState.isSideMenuClosed,
    languageOptions: feedState.languageOptions,
    organizationName,
    eventTitle,
    eventDescription,
    currentUser: feedState.currentUser,
    currentLanguage: feedState.currentLanguage,
  };
};

const mapDispatchToProps = dispatch => (
  {
    close: () => dispatch(closeMenu()),
    logout: () => {
      dispatch(removeAuthentication());
      logout();
    },
    onSwipe: direction => {
      if (direction === 'left') return dispatch(closeMenu());
    },
    setLanguage: language => (dispatch(setLanguage(language))),
  }
);

const VisibleSideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

export default VisibleSideMenu;
