// @flow
import Navbar from './navbar';
import { connect } from 'react-redux';

import { getNavbarChannels, setNavbarIndex } from './dux';
import { setPaneToEvent } from '../pane/content/event/dux';
import { setPaneToChat } from '../pane/content/chat/dux';
import { setPaneToTab } from '../pane/content/tab/dux';

const mapStateToProps = state => {
  const { feed:feedState } = state;
  const { navbarIndex } = feedState;
  const items = getNavbarChannels(feedState);
  return {
    items,
    navbarIndex,
  };
};

const mapDispatchToProps = dispatch => (
  {
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
