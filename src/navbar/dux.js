// @flow
import {
  getCurrentChannel,
  getPublicChannelObject as publicChannel,
  getHostChannelObject as hostChannel,
  getDirectChannels as directChannels,
  getPlaceholderChannels as placeholderChannels,
  getMutedUsers,
} from '../selectors/channelSelectors';
import { createSelector } from 'reselect';
import { paneContentSelector } from '../selectors/paneSelectors';
import { PRIMARY_PANE } from '../pane/dux';
import { TAB } from '../pane/content/tab/dux';
import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';
import type { TabType } from '../pane/content/tab/dux';

// Action Types
const SET_NAVBAR_INDEX = 'SET_NAVBAR_INDEX';

// Flow Type Definitions

type NavbarItemType = {
  name: string,
  id: string,
  isCurrent: boolean,
  hasActions: boolean,
  hasNewMessages: boolean,
  otherUsersNames: Array<string>,
  isDirect: boolean,
  isPlaceholder: boolean,
  type: typeof EVENT | typeof CHAT | typeof TAB,
  tabType?: TabType,
};

type SetNavbarIndexType = {
  type: 'SET_NAVBAR_INDEX',
  index: number,
};

// Action Creators

const setNavbarIndex = (index:number):SetNavbarIndexType => (
  {
    type: SET_NAVBAR_INDEX,
    index,
  }
);

// Selectors

const getOtherUserNames = (channel, currentUser) => {
  const { participants } = channel;
  if (participants && participants.length) {
    return participants
      .filter(user => user?.pubnubToken !== currentUser?.pubnubToken)
      .map(user => user.name);
  } else {
    return [];
  }
};

// eslint is dumb when it comes to optional chaining
const hasAction = channel => channel && channel.moments && channel.moments.filter ?
  channel.moments.filter(moment => ( // eslint-disable-line no-undef
    moment.type === 'ACTIONABLE_NOTIFICATION' &&
    moment.active === true)).length > 0
  : undefined;

const hasNewMessage = (channel, currentUser, mutedUsers) => {
  if (channel && channel.sawLastMomentAt !== undefined) {
    return channel.moments.some(moment => {
      if (moment.sender) {
        const muted = mutedUsers.some(mutedUser => mutedUser === moment.sender.name);
        return muted ? false : (moment.timestamp > channel.sawLastMomentAt && moment.sender.id !== currentUser.id);
      } else {
        return false;
      }
    });
  } else {
    return false;
  }
};

const getCurrentUser = state => state.currentUser;

const createNavChannel = (channel, currentChannel, currentUser, mutedUsers) => (
  {
    name: channel.name,
    id: channel.id,
    isCurrent: currentChannel === channel.id,
    hasActions: hasAction(channel),
    hasNewMessages: currentChannel === channel.id ? false : hasNewMessage(channel, currentUser, mutedUsers),
    otherUsersNames: getOtherUserNames(channel, currentUser),
    isDirect: channel.direct,
    isPlaceholder: channel.placeholder,
    type: channel.name === 'Public' ? EVENT : CHAT,
  }
);

const getPublicChannel = createSelector(
  state => publicChannel(state) || { name: 'Public', id: 'event', moments: [], direct: false },
  getCurrentChannel,
  getCurrentUser,
  getMutedUsers,
  createNavChannel
);

const getHostChannel = createSelector(
  state => hostChannel(state) || { name: 'Host', id: 'host', moments: [], direct: false },
  getCurrentChannel,
  getCurrentUser,
  getMutedUsers,
  createNavChannel
);

const getDirectChannels = createSelector(
  directChannels,
  getCurrentChannel,
  getCurrentUser,
  getMutedUsers,
  (channels, currentChannel, currentUser, mutedUsers) =>
    Object.keys(channels).map(id => createNavChannel(channels[id], currentChannel, currentUser, mutedUsers))
);

const getPlaceholderChannels = createSelector(
  placeholderChannels,
  getCurrentChannel,
  getCurrentUser,
  getMutedUsers,
  (channels, currentChannel, currentUser, mutedUsers) =>
    Object.keys(channels).map(id => createNavChannel(channels[id], currentChannel, currentUser, mutedUsers))
);

const getTabs = createSelector(
  state => state.tabs,
  state => paneContentSelector(state, PRIMARY_PANE),
  (tabs, currentPane) =>
    tabs.map(tab => ({
      name: tab,
      id: tab,
      isCurrent: currentPane.type === TAB && currentPane.content.type === tab,
      hasActions: false,
      hasNewMessages: false,
      otherUsersNames: [],
      isDirect: false,
      type: TAB,
      tabType: tab,
    }))
);

const getNavbarChannels = createSelector(
  getPublicChannel,
  getDirectChannels,
  getPlaceholderChannels,
  getHostChannel,
  getTabs,
  (publicChannel, directChannels, placeholderChannels, hostChannel, tabs) =>
    [publicChannel, ...directChannels, ...placeholderChannels, hostChannel, ...tabs]
);

// Exports

export {
  getHostChannel,
  getPublicChannel,
  getDirectChannels,
  getPlaceholderChannels,
  getTabs,
  setNavbarIndex,
  SET_NAVBAR_INDEX,
  getNavbarChannels,
};

export type {
  NavbarItemType,
  SetNavbarIndexType,
};
