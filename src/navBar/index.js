// @flow
import NavBar from './navBar';
import { connect } from 'react-redux';

import { changeChannel } from '../feed/dux';
import { getChannels } from '../navBar/dux';

const mapStateToProps = state => {
  const navBarState = state.navBar;
  return {
    channels: getChannels(navBarState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    onClick: event => dispatch(changeChannel(event.target.getAttribute('value'))),
  }
);

const VisibleNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default VisibleNavBar;
