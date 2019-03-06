// @flow
import { connect } from 'react-redux';
import NavMenu from './navMenu';
import {setPaneToChat} from '../pane/content/chat/dux';
import {setPaneToTab} from '../pane/content/tab/dux';
import {setPaneToEvent} from '../pane/content/event/dux';
import {getDirectChannels, getHostChannel, getPublicChannel, getTabs} from '../navbar/dux';
import {openMenu} from '../sideMenu/dux';
import { toggleNavMenuExpanded, isNavMenuExpanded } from './dux';
import { getCurrentTabType } from '../selectors/channelSelectors';

const mapStateToProps = state => {
  const feedState = state.feed;
  return {
    organizationName: feedState.organization.name,
    publicChannel: getPublicChannel(feedState),
    hostChannel: getHostChannel(feedState),
    directChannels: getDirectChannels(feedState),
    currentTabType: getCurrentTabType(feedState),
    tabs: getTabs(feedState),
    expanded: isNavMenuExpanded(feedState),
  };
};

const mapDispatchToProps = dispatch => (
  {
    toggleExpanded: () => dispatch(toggleNavMenuExpanded()),
    openMenu: () => dispatch(openMenu()),
    setPaneToChat: (name, channelId) => (dispatch(setPaneToChat(name, channelId))),
    setPaneToTab: (name, type) => (dispatch(setPaneToTab(name, type))),
    setPaneToEvent: (name, channelId) => (dispatch(setPaneToEvent(name, channelId))),
  }
);

const VisibleNavMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(NavMenu);

export default VisibleNavMenu;