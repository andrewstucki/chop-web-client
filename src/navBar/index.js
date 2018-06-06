// @flow
import NavBar from './navBar';
import { connect } from 'react-redux';

import { changeChannel } from '../feed/dux';
import { getChannels } from '../navBar/dux';
import { openMenu } from '../sideMenu/dux';
import { getBarX, getBarWidth } from '../io/dom/dux';

const mapStateToProps = state => {
  const navBarState = state.navBar;
  const domState = state.io.dom;
  return {
    channels: getChannels(navBarState),
    barX: getBarX(domState),
    barWidth: getBarWidth(domState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    onClick: event => dispatch(changeChannel(event.target.getAttribute('value'))),
    openMenu: () => dispatch(openMenu()),
  }
);

const VisibleNavBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavBar);

export default VisibleNavBar;
