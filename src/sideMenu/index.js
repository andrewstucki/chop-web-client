// @flow
import SideMenu from './sideMenu';
import { closeMenu, logout } from './dux';
import { connect } from 'react-redux';

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
  }
);

const VisibleSideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

export default VisibleSideMenu;
