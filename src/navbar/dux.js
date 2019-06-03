// @flow
import {
  getCurrentChannel,
  getPublicChannelObject as publicChannel,
  getHostChannelObject as hostChannel,
  getDirectChannels as directChannels,
  getPlaceholderChannels as placeholderChannels,
} from '../selectors/channelSelectors';
import { getMutedSubscribers } from '../subscriber/dux';
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
  otherSubscribersNames: Array<string>,
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

const getOtherSubscriberNames = (channel, currentSubscriber) => {
  const { subscribers } = channel;
  if (subscribers && subscribers.length) {
    return subscribers
      .filter(subscriber => subscriber.id !== currentSubscriber.id)
      .map(subscriber => subscriber.nickname);
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

const hasNewMessage = (channel, currentSubscriber, mutedSubscribers) => {
  if (channel && channel.sawLastMomentAt !== undefined && channel.type !== 'public') {
    return channel.moments.some(moment => {
      if (moment.subscriber) {
        const muted = mutedSubscribers.some(mutedSubscriber => mutedSubscriber === moment.subscriber.nickname);
        return muted ? false : (moment.timestamp > channel.sawLastMomentAt && moment.subscriber.id !== currentSubscriber.id);
      } else {
        return false;
      }
    });
  } else {
    return false;
  }
};

const getCurrentSubscriber = state => state.subscriber.currentSubscriber;

const createNavChannel = (channel, currentChannel, currentSubscriber, mutedSubscribers) => (
  {
    name: channel.name,
    id: channel.id,
    isCurrent: currentChannel === channel.id,
    hasActions: hasAction(channel),
    hasNewMessages: currentChannel === channel.id ? false : hasNewMessage(channel, currentSubscriber, mutedSubscribers),
    otherSubscribersNames: getOtherSubscriberNames(channel, currentSubscriber),
    isDirect: channel.direct,
    isPlaceholder: channel.placeholder,
    type: channel.name === 'Public' ? EVENT : CHAT,
  }
);

const getPublicChannel = createSelector(
  state => publicChannel(state) || { name: 'Public', id: 'event', moments: [], direct: false },
  getCurrentChannel,
  getCurrentSubscriber, 
  getMutedSubscribers,  
  createNavChannel
);

const getHostChannel = createSelector(
  state => hostChannel(state) || { name: 'Host', id: 'host', moments: [], direct: false },
  getCurrentChannel,
  getCurrentSubscriber,
  getMutedSubscribers,
  createNavChannel
);

const getDirectChannels = createSelector(
  directChannels,
  getCurrentChannel,
  getCurrentSubscriber,
  getMutedSubscribers,
  (channels, currentChannel, currentSubscriber, mutedSubscribers) =>
    Object.keys(channels).map(id => createNavChannel(channels[id], currentChannel, currentSubscriber, mutedSubscribers))
);

const getPlaceholderChannels = createSelector(
  placeholderChannels,
  getCurrentChannel,
  getCurrentSubscriber,
  getMutedSubscribers,
  (channels, currentChannel, currentSubscriber, mutedSubscribers) =>
    Object.keys(channels).map(id => createNavChannel(channels[id], currentChannel, currentSubscriber, mutedSubscribers))
);

const local = state => state.feed || state;

const getTabs = createSelector(
  state => local(state).tabs,
  state => paneContentSelector(state, PRIMARY_PANE),
  (tabs, currentPane) =>
    tabs.map(tab => ({
      name: tab,
      id: tab,
      isCurrent: currentPane.type === TAB && currentPane.content.type === tab,
      hasActions: false,
      hasNewMessages: false,
      otherSubscribersNames: [],
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
