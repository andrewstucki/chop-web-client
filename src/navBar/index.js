// @flow
import NavBar from './navBar';
import { connect } from 'react-redux';

import { changeChannel } from '../feed/dux';
import { getChannels } from '../navBar/dux';
import { openMenu } from '../sideMenu/dux';

const mapStateToProps = state => {
  const navBarState = state.navBar;
  return {
    channels: getChannels(navBarState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    onClick: id => dispatch(changeChannel(id)),
    openMenu: () => dispatch(openMenu()),
  }
);

const VisibleNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default VisibleNavBar;
