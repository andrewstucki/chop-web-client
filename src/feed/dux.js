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

import type {
  PublishReactionActionType,
  ReactionType,
} from '../reactions/reactionButton/dux';

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
  PUBLISH_REACTION,
} from '../reactions/reactionButton/dux';

import {
  OPEN_SIDE_MENU,
  CLOSE_SIDE_MENU,
} from '../sideMenu/dux';

import { TOGGLE_CHAT_FOCUS } from '../chat/dux';

import { SET_VIDEO_URL } from '../videoFeed/dux';

import {
  RELEASE_ANCHOR_MOMENT,
  SET_ANCHOR_MOMENT,
} from '../placeholder/anchorMoment/dux';

import { SET_LANGUAGE } from '../languageSelector/dux';

// Action Types

const CHANGE_CHANNEL = 'CHANGE_CHANNEL';
const RECEIVE_MOMENT = 'RECEIVE_MOMENT';
const ADD_CHANNEL = 'ADD_CHANNEL';
const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
const INVITE_TO_CHANNEL = 'INVITE_TO_CHANNEL';
const RECEIVE_ACCEPTED_PRAYER_REQUEST = 'RECEIVE_ACCEPTED_PRAYER_REQUEST';
const TOGGLE_POP_UP_MODAL = 'TOGGLE_POP_UP_MODAL';
const LEAVE_CHANNEL = 'LEAVE_CHANNEL';
const SET_INIT_DATA = 'SET_INIT_DATA';
const GET_INIT_DATA = 'GET_INIT_DATA';
const REMOVE_REACTION = 'REMOVE_REACTION';
const RECEIVE_REACTION = 'RECEIVE_REACTION';
const SET_USER = 'SET_USER';
const PUBLISH_LEAVE_CHANNEL = 'PUBLISH_LEAVE_CHANNEL';

// Flow Type Definitions

type GetInitData = {
  type: 'GET_INIT_DATA',
};

type EventType = {
  title: string,
  id: number,
  startTime: number,
  timezone: string,
};

type LanguageType = {
  code: string,
  name: string,
};

type VideoType = {
  type: string,
  url: string,
};

type OrganizationType = {
  id: number,
  name: string,
};

type PubnubKeysType = {
  publish: string,
  subscribe: string,
};

type SetInitDataType = {
  type: 'SET_INIT_DATA',
  event: EventType,
  video: VideoType,
  organization: OrganizationType,
  user: PrivateUserType,
  channels: ChannelCollectionType,
  pubnubKeys: PubnubKeysType,
  currentChannel: string,
  languageOptions: Array<LanguageType>
};

type SetUser = {
  type: 'SET_USER',
  user: PrivateUserType,
};

type RemoveReactionType = {
  type: 'REMOVE_REACTION',
  id: string,
}

type ReceiveReactionType = {
  type: 'RECEIVE_REACTION',
  reaction: ReactionType,
}

type PrivateUserType = {
  id: string,
  name: string,
  avatarUrl?: string,
  pubnubToken: string,
  pubnubAccessKey: string,
  role: {
    label: string,
    permissions: Array<string>,
  }
};

type SharedUserType = {
  name: string,
  avatarUrl?: string,
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

type ChannelCollectionType = { [string]: ChannelType };

type FeedType = {
  pubnubKeys: PubnubKeysType,
  event: EventType,
  organization: OrganizationType,
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
  isVideoHidden: boolean,
  isLanguageSelectorVisible: boolean,
  video: VideoType,
  currentLanguage: string,
  languageOptions: Array<LanguageType>,
  reactions: Array<ReactionType>,
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
  channelId: string,
  channelName: string,
};

type RemoveChannelType = {
  type: 'REMOVE_CHANNEL',
  channel: string,
};

type TogglePopUpModalType = {
  type: 'TOGGLE_POP_UP_MODAL',
};

type LeaveChannelType = {
  type: 'LEAVE_CHANNEL',
  user: SharedUserType,
};

type PublishLeaveChannelType = {
  type: 'PUBLISH_LEAVE_CHANNEL',
  user: SharedUserType,
  channel: string,
}

type FeedActionTypes =
  | SetInitDataType
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
  | ReceiveAcceptedPrayerRequestType
  | PublishReactionActionType
  | RemoveReactionType
  | ReceiveReactionType;

// Action Creators

const getInitData = (): GetInitData => (
  {
    type: GET_INIT_DATA,
  }
);

const removeReaction = (id: string): RemoveReactionType => (
  {
    type: REMOVE_REACTION,
    id,
  }
);

const setUser = (user: PrivateUserType): SetUser => (
  {
    type: SET_USER,
    user,
  }
);

const setInitData = (
  {
    event,
    video,
    organization,
    user,
    channels,
    pubnubKeys,
    currentChannel,
    languageOptions,
  }:
  {
    event: EventType,
    video: VideoType,
    organization: OrganizationType,
    user: PrivateUserType,
    channels: ChannelCollectionType,
    pubnubKeys: PubnubKeysType,
    currentChannel: string,
    languageOptions: Array<LanguageType>,
  }
): SetInitDataType => (
  {
    type: SET_INIT_DATA,
    event,
    organization,
    video,
    channels,
    user,
    pubnubKeys,
    currentChannel,
    languageOptions,
  }
);

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
  id: string,
  channel: string
): ReceiveAcceptedPrayerRequestType => (
  {
    type: RECEIVE_ACCEPTED_PRAYER_REQUEST,
    id,
    channel,
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
  channelId: string,
  channelName: string,
): InviteToChannelType => (
  {
    type: INVITE_TO_CHANNEL,
    user,
    channelId,
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

const leaveChannel = (pubnubToken: string, channel: string): LeaveChannelType => (
  {
    type: LEAVE_CHANNEL,
    pubnubToken,
    channel,
  }
);

const publishLeaveChannel = (user: SharedUserType, channel: string): PublishLeaveChannelType => (
  {
    type: PUBLISH_LEAVE_CHANNEL,
    user,
    channel,
  }
);

// Default State

const getLanguage = () => {
  const bcp47 = window.navigator.language || 'en';
  const iso639 = bcp47.substring(0, bcp47.indexOf('-'));
  // Google Translate requires ISO 639 format except for Chinese where they need BCP 47
  return iso639 === 'zh' ? bcp47 : iso639;
};

const defaultState = {
  pubnubKeys: {
    publish: '',
    subscribe: '',
  },
  event: {
    id: 0,
    startTime: 0,
    title: '',
    timezone: '',
  },
  organization: {
    id: 0,
    name: '',
  },
  channels: {},
  currentChannel: '',
  currentUser: {
    id: '',
    name: '',
    pubnubToken: '',
    pubnubAccessKey: '',
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
  isVideoHidden: false,
  isLanguageSelectorVisible: false,
  video: {
    type: '',
    url: '',
  },
  currentLanguage: getLanguage(),
  languageOptions: [
    {
      code: 'en',
      name: 'English',
    },
    {
      code: 'zh-CN',
      name: 'Chinese',
    },
    {
      code: 'fr',
      name: 'French',
    },
    {
      code: 'es',
      name: 'Spanish',
    },
    {
      code: 'de',
      name: 'German',
    },
    {
      code: 'it',
      name: 'Italian',
    },
    {
      code: 'ko',
      name: 'Korean',
    },
  ],
  reactions: [],
};

// Reducer

const reducer = (
  state: FeedType = defaultState,
  action?: FeedActionTypes): FeedType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case SET_INIT_DATA: {
    return {
      ...state,
      event: action.event,
      organization: action.organization,
      video: action.video,
      currentUser: action.user,
      pubnubKeys: action.pubnubKeys,
      channels: action.channels,
      currentChannel: action.currentChannel,
      languageOptions: action.languageOptions,
    };
  }
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
    if (state.channels[action.channel.id]) {
      return state;
    }
    return {
      ...state,
      channels: {
        ...state.channels,
        [action.channel.id]: action.channel,
      },
    };
  case INVITE_TO_CHANNEL:
    return {
      ...state,
      channels: {
        ...state.channels,
        [action.channelId]: {
          ...state[action.channelId],
          id: action.channelId,
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
    // $FlowFixMe
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
    // $FlowFixMe
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
                messageTrayOpen: message.id === id ? false : message.messageTrayOpen,
              }
            )
          ),
        },
      },
    };
  }
  case TOGGLE_CLOSE_TRAY_BUTTON: {
    // $FlowFixMe
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
                closeTrayButtonRendered: message.id === id ?
                  !message.closeTrayButtonRendered : message.closeTrayButtonRendered,
              }
            )
          ),
        },
      },
    };
  }
  case PUBLISH_ACCEPTED_PRAYER_REQUEST:
  case RECEIVE_ACCEPTED_PRAYER_REQUEST: {
    // $FlowFixMe
    const { id, channel} = action;
    return {
      ...state,
      channels: {
        ...state.channels,
        // $FlowFixMe
        [channel]: {
          // $FlowFixMe
          ...state.channels[channel],
          // $FlowFixMe
          moments: state.channels[channel].moments.map(
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
    // $FlowFixMe
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
    // $FlowFixMe
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
                // $FlowFixMe
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
        // $FlowFixMe
        [action.channel]: {
          // $FlowFixMe
          ...state.channels[action.channel],
          moments: [
            // $FlowFixMe
            ...state.channels[action.channel].moments,
            // $FlowFixMe
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
  case LEAVE_CHANNEL: {
    const { channels, currentChannel } = state;
    if (currentChannel &&
      channels[currentChannel].participants &&
      channels[currentChannel].participants.length
    ) {
      const { participants } = channels[currentChannel];
      const userIndex = participants.findIndex(el => (
        el.pubnubToken === action.pubnubToken
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
  case 'SET_AVATAR':
    return {
      ...state,
      currentUser: {
        ...state.currentUser,
        avatarUrl: action.url,
      },
    };
  case TOGGLE_CHAT_FOCUS:
    return {
      ...state,
      isChatFocused: action.focus,
      isVideoHidden: action.focus,
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
  case SET_VIDEO_URL:
    return {
      ...state,
      video: {
        ...state.video,
        url: action.url,
      },
    };
  case SET_LANGUAGE:
    return {
      ...state,
      currentLanguage: action.language,
    };
  case PUBLISH_REACTION:
  case RECEIVE_REACTION:
    return {
      ...state,
      reactions: [...state.reactions, action.reaction],
    };
  case REMOVE_REACTION:
    return {
      ...state,
      // $FlowFixMe
      reactions: state.reactions.filter(reaction => reaction.id !== action.id),
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
    avatarUrl: state.currentUser.avatarUrl,
    role: {
      label: state.currentUser.role.label,
    },
  }
);

const feedContents = (state: FeedType): Array<MessageType> => (
  state.channels[state.currentChannel] && state.channels[state.currentChannel].moments ?
    state.channels[state.currentChannel].moments.map(moment => {
      if (moment.type === 'MESSAGE' && moment.lang !== state.currentLanguage && moment.translations) {
        const [ translation ] = moment.translations.filter(translation => 
          translation.languageCode === state.currentLanguage
        );
        if (translation && translation.text) {
          moment.text = translation.text;
        }
      }
      return moment;
    }) :
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
  LEAVE_CHANNEL,
  GET_INIT_DATA,
  SET_INIT_DATA,
  PUBLISH_LEAVE_CHANNEL,
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
  leaveChannel,
  getCurrentUserAsSharedUser,
  getInitData,
  setInitData,
  removeReaction,
  setUser,
  publishLeaveChannel,
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
  LeaveChannelType,
  GetInitData,
  SetInitDataType,
  LanguageType,
  OrganizationType,
  PublishLeaveChannelType,
};

export default reducer;
