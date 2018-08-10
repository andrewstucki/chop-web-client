// @flow
import type {
  MessageType,
  OpenMessageTrayType,
  CloseMessageTrayType,
  DeleteMessageType,
  ToggleCloseTrayButtonType,
  MomentType,
  PublishAcceptedPrayerRequestType,
} from '../moment';

import type { SetUser } from '../io/chat/dux';

import type { AnchorMomentType } from '../placeholder/anchorMoment/dux';

import {
  OPEN_MESSAGE_TRAY,
  CLOSE_MESSAGE_TRAY,
  DELETE_MESSAGE,
  TOGGLE_CLOSE_TRAY_BUTTON,
  MESSAGE,
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  PUBLISH_MOMENT_TO_CHANNEL,
} from '../moment';

import {
  OPEN_SIDE_MENU,
  CLOSE_SIDE_MENU,
} from '../sideMenu/dux';

import { TOGGLE_CHAT_FOCUS } from '../chat/dux';

import { SET_USER } from '../io/chat/dux';

import {
  RELEASE_ANCHOR_MOMENT,
  SET_ANCHOR_MOMENT,
} from '../placeholder/anchorMoment/dux';

// Action Types
const CHANGE_CHANNEL = 'CHANGE_CHANNEL';
const RECEIVE_MOMENT = 'RECEIVE_MOMENT';
const ADD_CHANNEL = 'ADD_CHANNEL';
const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
const INVITE_TO_CHANNEL = 'INVITE_TO_CHANNEL';
const RECEIVE_ACCEPTED_PRAYER_REQUEST = 'RECEIVE_ACCEPTED_PRAYER_REQUEST';
const TOGGLE_POP_UP_MODAL = 'TOGGLE_POP_UP_MODAL';
const LEAVE_CHAT = 'LEAVE_CHAT';

// Flow Type Definitions

type PrivateUserType = {
  id: string,
  name: string,
  pubnubToken: string,
  pubnubAccessToken: string,
  role: {
    label: string,
    permissions: Array<string>,
  }
};

type SharedUserType = {
  name: string,
  pubnubToken: string,
  role: {
    label: string,
  }
};

type ChannelType = {
  id: string,
  name: string,
  moments: Array<MomentType>,
  participants?: Array<SharedUserType>,
};

type FeedType = {
  channels: {
    [string]: ChannelType,
  },
  currentChannel: string,
  currentUser: PrivateUserType,
  appendingMessage: boolean,
  anchorMoment: AnchorMomentType | null,
  animatingMoment: boolean,
  isPlaceholderPresent: boolean,
  isPopUpModalVisible: boolean,
  isChatFocused: boolean,
  isSideMenuClosed: boolean,
};

type ChangeChannelType = {
  type: 'CHANGE_CHANNEL',
  channel: string,
};

type ReceiveMomentType = {
  type: 'RECEIVE_MOMENT',
  channel: string,
  moment: MomentType,
};

type ReceiveAcceptedPrayerRequestType = {
  type: 'RECEIVE_ACCEPTED_PRAYER_REQUEST',
  id: string,
  channel: string,
};

type AddChannelType = {
  type: 'ADD_CHANNEL',
  channel: ChannelType,
};

type InviteToChannelType = {
  type: 'INVITE_TO_CHANNEL',
  user: SharedUserType,
  channelName: string,
};

type RemoveChannelType = {
  type: 'REMOVE_CHANNEL',
  channel: string,
};

type TogglePopUpModalType = {
  type: 'TOGGLE_POP_UP_MODAL',
};

type LeaveChatType = {
  type: 'LEAVE_CHAT',
  user: SharedUserType,
};

type FeedActionTypes =
  | ChangeChannelType
  | ReceiveMomentType
  | AddChannelType
  | RemoveChannelType
  | SetUser
  | OpenMessageTrayType
  | CloseMessageTrayType
  | DeleteMessageType
  | ToggleCloseTrayButtonType
  | PublishAcceptedPrayerRequestType
  | InviteToChannelType
  | ReceiveAcceptedPrayerRequestType;

// Action Creators

const changeChannel = (newChannel: string): ChangeChannelType => (
  {
    type: CHANGE_CHANNEL,
    channel: newChannel,
  }
);

const receiveMoment = (
  channel: string,
  moment: MomentType
): ReceiveMomentType => (
  {
    type: RECEIVE_MOMENT,
    channel,
    moment,
  }
);

const receiveAcceptedPrayerRequest = (
  id: string
): ReceiveAcceptedPrayerRequestType => (
  {
    type: RECEIVE_ACCEPTED_PRAYER_REQUEST,
    id,
    channel: 'host',
  }
);

const addChannel = (
  name: string,
  id: string,
  participants?: Array<SharedUserType>
): AddChannelType => (
  {
    type: ADD_CHANNEL,
    channel: {
      id,
      name,
      moments: [],
      participants,
    },
  }
);

const inviteToChannel = (
  user: SharedUserType,
  channelName: string
): InviteToChannelType => (
  {
    type: INVITE_TO_CHANNEL,
    user,
    channelName,
  }
);

const removeChannel = (channel: string): RemoveChannelType => (
  {
    type: REMOVE_CHANNEL,
    channel,
  }
);

const togglePopUpModal = (): TogglePopUpModalType => (
  {
    type: TOGGLE_POP_UP_MODAL,
  }
);

const leaveChat = (user: SharedUserType): LeaveChatType => (
  {
    type: LEAVE_CHAT,
    user,
  }
);

// Default State

const defaultState = {
  channels: {},
  currentChannel: '',
  currentUser: {
    id: '',
    name: '',
    pubnubToken: '',
    pubnubAccessToken: '',
    role: {
      label: '',
      permissions: [],
    },
  },
  appendingMessage: false,
  anchorMoment: null,
  animatingMoment: true,
  isPlaceholderPresent: false,
  isPopUpModalVisible: false,
  isChatFocused: false,
  isSideMenuClosed: true,
};

// Reducer

const reducer = (
  state: FeedType = defaultState,
  action?: FeedActionTypes): FeedType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case CHANGE_CHANNEL:
    if (!state.channels[action.channel]) {
      return state;
    }
    return {
      ...state,
      appendingMessage: false,
      currentChannel: action.channel,
    };
  case RECEIVE_MOMENT:
    if (state.channels[action.channel]) {
      return {
        ...state,
        appendingMessage: false,
        animatingMoment: true,
        channels: {
          ...state.channels,
          [action.channel]: {
            ...state.channels[action.channel],
            moments: [
              ...state.channels[action.channel].moments,
              action.moment,
            ],
          },
        },
      };
    }
    return state;
  case ADD_CHANNEL:
    if (state.channels[action.channel.name]) {
      return state;
    }
    return {
      ...state,
      channels: {
        ...state.channels,
        [action.channel.name]: action.channel,
      },
    };
  case INVITE_TO_CHANNEL:
    return {
      ...state,
      channels: {
        ...state.channels,
        [action.channelName]: {
          ...state[action.channelName],
          id: action.channelName,
          name: action.channelName,
          moments: [],
          participants: [
            getCurrentUserAsSharedUser(state),
            action.user,
          ],
        },
      },
    };
  case REMOVE_CHANNEL: {
    if (action.channel === 'public' ||
      action.channel === 'host' || 
      action.channel === 'request' ||
      action.channel === 'command'
    ) {
      return state;
    }
    const stateCopy = { ...state };
    if (action.channel === state.currentChannel) {
      if (state.channels.public) {
        stateCopy.currentChannel = 'public';
      } else {
        stateCopy.currentChannel = '';
      }
    }
    delete stateCopy.channels[action.channel];
    return stateCopy;
  }
  case SET_USER:
    return {
      ...state,
      currentUser: action.user,
    };
  case OPEN_MESSAGE_TRAY: {
    const { id } = action;
    return {
      ...state,
      channels: {
        ...state.channels,
        [state.currentChannel]: {
          ...state.channels[state.currentChannel],
          moments: state.channels[state.currentChannel].moments.map(
            message => (
              {
                ...message,
                messageTrayOpen: message.id === id,
              }
            )
          ),
        },
      },
    };
  }
  case CLOSE_MESSAGE_TRAY: {
    const { id } = action;
    return {
      ...state,
      channels: {
        ...state.channels,
        [state.currentChannel]: {
          ...state.channels[state.currentChannel],
          moments: state.channels[state.currentChannel].moments.map(
            message => (
              {
                ...message,
                messageTrayOpen: message.id === id ? false : null,
              }
            )
          ),
        },
      },
    };
  }
  case TOGGLE_CLOSE_TRAY_BUTTON: {
    const { id } = action;
    return {
      ...state,
      channels: {
        ...state.channels,
        [state.currentChannel]: {
          ...state.channels[state.currentChannel],
          moments: state.channels[state.currentChannel].moments.map(
            message => (
              {
                ...message,
                closeTrayButtonRendered: message.id === id ? !message.closeTrayButtonRendered : null,
              }
            )
          ),
        },
      },
    };
  }
  case PUBLISH_ACCEPTED_PRAYER_REQUEST:
  case RECEIVE_ACCEPTED_PRAYER_REQUEST: {
    const { id } = action;
    return {
      ...state,
      channels: {
        ...state.channels,
        [action.channel]: {
          ...state.channels[action.channel],
          moments: state.channels[action.channel].moments.map(
            moment => (
              {
                ...moment,
                active: moment.id === id ? !moment.active : moment.active,
              }
            )
          ),
        },
      },
    };
  }
  case DELETE_MESSAGE: {
    const { id } = action;
    const { channels, currentChannel } = state;
    const messageIndex = channels[currentChannel].moments.findIndex(el => (
      el.id === id
    ));
    return {
      ...state,
      channels: {
        ...channels,
        [currentChannel]: {
          ...channels[currentChannel],
          moments: [
            ...channels[currentChannel].moments.slice(0, messageIndex),
            ...channels[currentChannel].moments.slice(messageIndex + 1),
          ],
        },
      },
    };
  }
  case PUBLISH_MOMENT_TO_CHANNEL: {
    if (action.moment.type === MESSAGE) {
      if ([action.moment.text].toString().length > 0) {
        return {
          ...state,
          appendingMessage: true,
          animatingMoment: true,
          channels: {
            ...state.channels,
            [state.currentChannel]: {
              ...state.channels[state.currentChannel],
              moments: [
                ...state.channels[state.currentChannel].moments,
                action.moment,
              ],
            },
          },
          chatInput: '',
        };
      }
    }
    return {
      ...state,
      animatingMoment: true,
      channels: {
        ...state.channels,
        [action.channel]: {
          ...state.channels[action.channel],
          moments: [
            ...state.channels[action.channel].moments,
            action.moment,
          ],
        },
      },
    };
  }
  case SET_ANCHOR_MOMENT:
    return {
      ...state,
      isPlaceholderPresent: true,
      anchorMoment: action.anchorMoment,
    };
  case RELEASE_ANCHOR_MOMENT:
    return {
      ...state,
      isPlaceholderPresent: false,
      animatingMoment: false,
      channels: {
        ...state.channels,
        [action.channel]: {
          ...state.channels[action.channel],
          moments: [
            ...state.channels[action.channel].moments,
            state.anchorMoment,
          ],
        },
      },
      anchorMoment: null,
    };
  case TOGGLE_POP_UP_MODAL:
    return {
      ...state,
      isPopUpModalVisible: !state.isPopUpModalVisible,
    };
  case LEAVE_CHAT: {
    const { channels, currentChannel } = state;
    const { user } = action;
    if (currentChannel &&
      channels[currentChannel].participants &&
      channels[currentChannel].participants.length
    ) {
      const { participants } = channels[currentChannel];
      const userIndex = participants.findIndex(el => (
        el.pubnubToken === user.pubnubToken
      ));
      if (participants) {
        // Flow complains that participants can still
        // be undefined here even though we already checked for them
        return {
          ...state,
          channels: {
            ...channels,
            [currentChannel]: {
              ...channels[currentChannel],
              participants: [
                ...participants.slice(0, userIndex),
                ...participants.slice(userIndex + 1),
              ],
            },
          },
        };
      }
    }
    return state;
  }
  case TOGGLE_CHAT_FOCUS:
    return {
      ...state,
      isChatFocused: action.focus,
    };
  case CLOSE_SIDE_MENU:
    return {
      ...state,
      isSideMenuClosed: true,
    };
  case OPEN_SIDE_MENU:
    return {
      ...state,
      isSideMenuClosed: false,
    };
  default:
    return state;
  }
};

// Selectors

const getCurrentUserAsSharedUser = (state: FeedType): SharedUserType => (
  {
    pubnubToken: state.currentUser.pubnubToken,
    name: state.currentUser.name,
    role: {
      label: state.currentUser.role.label,
    },
  }
);

const feedContents = (state: FeedType): Array<MessageType> => (
  state.channels[state.currentChannel] && state.channels[state.currentChannel].moments ?
    state.channels[state.currentChannel].moments :
    []
);

const appendMessage = (state: FeedType): boolean => (
  state.appendingMessage
);

const hasParticipants = (state: FeedType): boolean => {
  if (state.currentChannel) {
    const currentChannel = state.channels[state.currentChannel];
    return currentChannel.participants &&
      currentChannel.participants.length ? true : false;
  }
  return false;
};

const getOtherUser = (state: FeedType): SharedUserType | null => {
  const currentChannel = state.channels[state.currentChannel];
  if (currentChannel &&
    currentChannel.participants
    && currentChannel.participants.length === 2
  ) {
    const [ otherUser ] = currentChannel.participants.filter(
      participant => participant.pubnubToken !== state.currentUser.pubnubToken
    );
    return otherUser;
  }
  return null;
};

// Exports

export {
  CHANGE_CHANNEL,
  RECEIVE_MOMENT,
  ADD_CHANNEL,
  REMOVE_CHANNEL,
  INVITE_TO_CHANNEL,
  TOGGLE_POP_UP_MODAL,
  LEAVE_CHAT,
};
export {
  changeChannel,
  receiveMoment,
  addChannel,
  removeChannel,
  feedContents,
  defaultState,
  appendMessage,
  inviteToChannel,
  receiveAcceptedPrayerRequest,
  hasParticipants,
  getOtherUser,
  togglePopUpModal,
  leaveChat,
  getCurrentUserAsSharedUser,
};
export type {
  AddChannelType,
  RemoveChannelType,
  MomentType,
  ReceiveMomentType,
  ChangeChannelType,
  FeedType,
  InviteToChannelType,
  ReceiveAcceptedPrayerRequestType,
  ChannelType,
  PrivateUserType,
  SharedUserType,
  TogglePopUpModalType,
  LeaveChatType,
};

export default reducer;
