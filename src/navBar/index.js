// @flow
import NavBar from './navBar';
import { connect } from 'react-redux';

const mapStateToProps = state => {
  const { navBarState } = state;
  return {
    channels: navBarState.channels,
    currentChannel: navBarState.currentChannel,
  };
};

const mapDispatchToProps = dispatch => (
  {}
);

const VisibleNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default VisibleNavBar;
