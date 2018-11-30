// @flow
import NavBar from './navBar';
import { connect } from 'react-redux';

import { getChannels } from '../navBar/dux';
import { openMenu } from '../sideMenu/dux';
import { setPrimaryPane } from '../pane/dux';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    channels: getChannels(feedState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    openMenu: () => dispatch(openMenu()),
    onClick: (id, type) => dispatch(setPrimaryPane(id, type)),
  }
);

const VisibleNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default VisibleNavBar;
