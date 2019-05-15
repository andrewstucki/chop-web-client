// @flow
import { connect } from 'react-redux';
import { closeMenu, logout } from './dux';
import { setLanguage } from '../languageSelector/dux';
import SideMenu from './sideMenu';
import { removeAuthentication } from '../feed/dux';
import { getHostChannel, getPublicChannel } from '../selectors/channelSelectors';
import { setPaneToEvent } from '../pane/content/event/dux';
import { setPaneToChat } from '../pane/content/chat/dux';
import { setPaneToTab, addTab } from '../pane/content/tab/dux';

const mapStateToProps = state => {
  const hostChannel = getHostChannel(state);
  const publicChannel = getPublicChannel(state);
  const { primary: currentPane } = state.feed.panes;
  const { name:organizationName } = state.feed.organization;
  const { title:eventTitle, description:eventDescription } = state.feed.event;

  return {
    isClosed: state.feed.isSideMenuClosed,
    languageOptions: state.feed.languageOptions,
    hostChannel,
    publicChannel,
    currentPane,
    organizationName,
    eventTitle,
    eventDescription,
    currentUser: state.user.currentUser,
    currentLanguage: state.feed.currentLanguage,
  };
};

const mapDispatchToProps = dispatch => (
  {
    close: () => dispatch(closeMenu()),
    logout: () => {
      dispatch(removeAuthentication());
      logout();
    },
    onSwipe: direction => {
      if (direction === 'left') return dispatch(closeMenu());
    },
    setLanguage: language => (dispatch(setLanguage(language))),
    setPaneToChat: (name, channelId) => (dispatch(setPaneToChat(name, channelId))),
    setPaneToTab: (name, type) => (dispatch(setPaneToTab(name, type))),
    setPaneToEvent: (name, channelId) => (dispatch(setPaneToEvent(name, channelId))),
    addTab: (type, id,  name) => (dispatch(addTab(type, id, name))),
  }
);

const VisibleSideMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);

export default VisibleSideMenu;
