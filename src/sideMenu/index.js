// @flow
import { connect } from 'react-redux';
import { closeMenu, logout } from './dux';
import { setLanguage } from '../languageSelector/dux';
import SideMenu from './sideMenu';
import { removeAuthentication } from '../feed/dux';

const mapStateToProps = state => {
  const { name:organizationName } = state.feed.organization;
  const { title:eventTitle, description:eventDescription } = state.feed.event;

  return {
    isClosed: state.feed.isSideMenuClosed,
    languageOptions: state.feed.languageOptions,
    organizationName,
    eventTitle,
    eventDescription,
    currentSubscriber: state.subscriber.currentSubscriber,
    currentLanguage: state.feed.currentLanguage,
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
