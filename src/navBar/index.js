// @flow
import NavBar from './navBar';
import { connect } from 'react-redux';

import { getHostChannel, getPublicChannel, getDirectChannels, setNavbarIndex } from './dux';
import { openMenu } from '../sideMenu/dux';
import { setPrimaryPane } from '../pane/dux';

const mapStateToProps = state => {
  const { feed:feedState } = state;
  const publicChannel = getPublicChannel(feedState);
  const hostChannel = getHostChannel(feedState);
  const directChannels = getDirectChannels(feedState);
  return {
    channels: [publicChannel, hostChannel, ...directChannels],
  };
};

const mapDispatchToProps = dispatch => (
  {
    openMenu: () => dispatch(openMenu()),
    setPrimaryPane: (id, type) => dispatch(setPrimaryPane(id, type)),
    setNavbarIndex: index => dispatch(setNavbarIndex(index)),
  }
);

const VisibleNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default VisibleNavBar;
