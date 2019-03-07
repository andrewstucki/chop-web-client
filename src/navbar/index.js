// @flow
import Navbar from './navbar';
import { connect } from 'react-redux';

import { getHostChannel, getPublicChannel, getDirectChannels, getTabs, setNavbarIndex } from './dux';
import { openMenu } from '../sideMenu/dux';
import { setPaneToEvent } from '../pane/content/event/dux';
import { setPaneToChat } from '../pane/content/chat/dux';
import { setPaneToTab } from '../pane/content/tab/dux';

const mapStateToProps = state => {
  const { feed:feedState } = state;
  const publicChannel = getPublicChannel(feedState);
  const hostChannel = getHostChannel(feedState);
  const directChannels = getDirectChannels(feedState);
  const tabs = getTabs(feedState);
  const { navbarIndex } = feedState;
  return {
    items: [publicChannel, hostChannel, ...directChannels, ...tabs],
    navbarIndex,
  };
};

const mapDispatchToProps = dispatch => (
  {
    openMenu: () => dispatch(openMenu()),
    setPaneToChat: (name, channelId) => (dispatch(setPaneToChat(name, channelId))),
    setPaneToTab: (name, type) => (dispatch(setPaneToTab(name, type))),
    setPaneToEvent: (name, channelId) => (dispatch(setPaneToEvent(name, channelId))),
    setNavbarIndex: index => dispatch(setNavbarIndex(index)),
  }
);

const VisibleNavbar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Navbar);

export default VisibleNavbar;
