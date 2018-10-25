// @flow
import { connect } from 'react-redux';
import { closeMenu, logout } from './dux';
import { setLanguage } from '../languageSelector/dux';
import SideMenu from './sideMenu';

const mapStateToProps = state => {
  const feedState = state.feed;

  return {
    isClosed: feedState.isSideMenuClosed,
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
    setLanguage: language => (dispatch(setLanguage(language))),
  }
);

const VisibleSideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

export default VisibleSideMenu;
