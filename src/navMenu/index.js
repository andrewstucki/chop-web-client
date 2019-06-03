// @flow
import { connect } from 'react-redux';
import NavMenu from './navMenu';
import {setPaneToChat} from '../pane/content/chat/dux';
import {setPaneToTab} from '../pane/content/tab/dux';
import {setPaneToEvent} from '../pane/content/event/dux';
import { getDirectChannels, getHostChannel, getPlaceholderChannels, getPublicChannel, getTabs } from '../navbar/dux';
import {openMenu} from '../sideMenu/dux';
import { toggleNavMenuExpanded, isNavMenuExpanded } from './dux';
import { getCurrentTabType } from '../selectors/channelSelectors';

const mapStateToProps = state => {
  const placeholderChannels = getPlaceholderChannels(state);
  const directChannels = getDirectChannels(state);
  return {
    organizationName: state.feed.organization.name,
    publicChannel: getPublicChannel(state),
    hostChannel: getHostChannel(state),
    directChannels: [...directChannels, ...placeholderChannels],
    currentTabType: getCurrentTabType(state),
    tabs: getTabs(state),
    expanded: isNavMenuExpanded(state),
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
