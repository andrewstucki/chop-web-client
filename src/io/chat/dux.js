// @flow
import type { Chat } from './chat';

import type {
  ReceiveMomentType,
  ChangeChannelType,
  AddChannelType,
  InviteToChannelType,
  PrivateUserType,
  RemoveChannelType,
} from '../../../src/feed/dux';

import type { PublishMomentToChannelType } from '../../../src/moment/dux';

import type { PublishAcceptedPrayerRequestType } from '../../../src/moment/actionableNotification/dux';

import { PUBLISH_MOMENT_TO_CHANNEL } from '../../../src/moment/dux';

import {
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  PRAYER_REQUEST,
} from '../../../src/moment/actionableNotification/dux';

import {
  ADD_CHANNEL,
  INVITE_TO_CHANNEL,
} from '../../../src/feed/dux';

// Actions Types

const SET_CHAT_KEYS = 'SET_CHAT_KEYS';
const SET_USER = 'SET_USER';

// Flow Type Definitions

type SetChatKeys = {
  type: 'SET_CHAT_KEYS',
  publishKey: string,
  subscribeKey: string,
};

type SetUser = {
  type: 'SET_USER',
  user: PrivateUserType,
};


type IOChatActionTypes =
  | SetChatKeys
  | SetUser
  | AddChannelType
  | ReceiveMomentType
  | ChangeChannelType
  | PublishMomentToChannelType
  | InviteToChannelType
  | PublishAcceptedPrayerRequestType
  | RemoveChannelType;

// Action Creators

const setChatKeys = (publishKey: string, subscribeKey: string): SetChatKeys => (
  {
    type: SET_CHAT_KEYS,
    publishKey,
    subscribeKey,
  }
);

const setUser = (user: PrivateUserType): SetUser => (
  {
    type: SET_USER,
    user,
  }
);

const getReducer = (chatIO: Chat) => (
  (
    state: Object = {},
    action: IOChatActionTypes
  ) => {
    if (!action || !action.type) {
      return state;
    }
    switch (action.type) {
    case SET_CHAT_KEYS:
      chatIO.setKeys(action.publishKey, action.subscribeKey);
      return state;
    case SET_USER:
      chatIO.setUser(action.user);
      return state;
    case ADD_CHANNEL:
      chatIO.addChat(action.channel.name, action.channel.id);
      return state;
    case PUBLISH_MOMENT_TO_CHANNEL: {
      // $FlowFixMe
      const { moment, channel } = action;
      if (moment.notificationType === PRAYER_REQUEST) {
        chatIO.publish('request', moment);
      } else {
        chatIO.publish(channel, moment);
      }
      return state;
    }
    case INVITE_TO_CHANNEL:
      chatIO.inviteToChannel(action.user.pubnubToken, action.channelName);
      return state;
    case PUBLISH_ACCEPTED_PRAYER_REQUEST:
      chatIO.publishAcceptedPrayerRequest(action.id, action.channel);
      return state;
    default:
      return state;
    }
  }
);

// Exports

export type {
  SetUser,
};

export {
  SET_USER,
};

export {
  setChatKeys,
  setUser,
};

export default getReducer;
