// @flow
import NavBar from './navBar';
import { connect } from 'react-redux';

import { changeChannel } from '../feed/dux';

const mapStateToProps = state => {
  const navBarState = state.navBar;
  return {
    channels: navBarState.channels,
    currentChannel: navBarState.currentChannel,
  };
};

const mapDispatchToProps = dispatch => (
  {
    onClick: event => dispatch(changeChannel(event.target.value)),
  }
);

const VisibleNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default VisibleNavBar;
