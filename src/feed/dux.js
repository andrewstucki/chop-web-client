// @flow
import type {
  MessageType,
  OpenMessageTrayType,
  CloseMessageTrayType,
  DeleteMessageType,
  ToggleCloseTrayButtonType,
  MomentType,
  ReceiveMomentType,
  PublishLeaveChannelType,
  PublishAcceptedPrayerRequestType,
} from '../moment';

import type {
  PublishReactionActionType,
  ReactionType,
} from '../reactions/reactionButton/dux';

import type { AnchorMomentType } from '../placeholder/anchorMoment/dux';

import { objectFilter } from '../util';

import {
  OPEN_MESSAGE_TRAY,
  CLOSE_MESSAGE_TRAY,
  DELETE_MESSAGE,
  TOGGLE_CLOSE_TRAY_BUTTON,
  MESSAGE,
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  PUBLISH_MOMENT_TO_CHANNEL,
  RECEIVE_MOMENT,
} from '../moment';

import {
  PUBLISH_REACTION,
} from '../reactions/reactionButton/dux';

import {
  OPEN_SIDE_MENU,
  CLOSE_SIDE_MENU,
} from '../sideMenu/dux';

import { TOGGLE_CHAT_FOCUS } from '../chat/dux';

import { SET_VIDEO } from '../videoFeed/dux';
import type { SetVideoType, VideoType } from '../videoFeed/dux';

import {
  RELEASE_ANCHOR_MOMENT,
  SET_ANCHOR_MOMENT,
} from '../placeholder/anchorMoment/dux';

import type { BannerType } from '../banner/dux';

import { SET_LANGUAGE } from '../languageSelector/dux';
import { getPublicChannel } from '../selectors/channelSelectors';

import { ADD_ERROR, REMOVE_ERROR } from '../errors/dux';
import type { ErrorType, AddErrorType, RemoveErrorType } from '../errors/dux';
import moment from 'moment';

// Action Types

const CHANGE_CHANNEL = 'CHANGE_CHANNEL';
const ADD_CHANNEL = 'ADD_CHANNEL';
const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
const INVITE_TO_CHANNEL = 'INVITE_TO_CHANNEL';
const RECEIVE_ACCEPTED_PRAYER_REQUEST = 'RECEIVE_ACCEPTED_PRAYER_REQUEST';
const TOGGLE_POP_UP_MODAL = 'TOGGLE_POP_UP_MODAL';
const LEAVE_CHANNEL = 'LEAVE_CHANNEL';
const GET_INIT_DATA = 'GET_INIT_DATA';
const REMOVE_REACTION = 'REMOVE_REACTION';
const RECEIVE_REACTION = 'RECEIVE_REACTION';
const SET_USER = 'SET_USER';
const SET_EVENT = 'SET_EVENT';
const SET_ORGANIZATION = 'SET_ORGANIZATION';
const SET_PUBNUB_KEYS = 'SET_PUBNUB_KEYS';
const SET_LANGUAGE_OPTIONS = 'SET_LANGUAGE_OPTIONS';
const LOAD_HISTORY = 'LOAD_HISTORY';
const SET_SCHEDULE = 'SET_SCHEDULE';
const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
const REMOVE_AUTHENTICATION = 'REMOVE_AUTHENTICATION';
const CLEAR_NOTIFICATION_BANNER = 'CLEAR_NOTIFICATION_BANNER';
const SET_NOTIFICATION_BANNER = 'SET_NOTIFICATION_BANNER';
const REMOVE_HERE_NOW = 'REMOVE_HERE_NOW';
const UPDATE_HERE_NOW = 'UPDATE_HERE_NOW';
const SET_SCHEDULE_DATA = 'SET_SCHEDULE_DATA';

// Flow Type Definitions

type GetInitData = {
  type: 'GET_INIT_DATA',
};

type SetScheduleDataType = {
  type: 'SET_SCHEDULE_DATA',
  time: number,
  data: any,
};

type ScheduleType = {
  id: number,
  startTime: number,
  endTime: number,
}

type SetScheduleType = {
  type: 'SET_SCHEDULE',
  schedule: Array<ScheduleType>,
}

type EventType = {
  title: string,
  id: number,
  startTime: number,
};

type LanguageType = {
  code: string,
  name: string,
};

type OrganizationType = {
  id: number,
  name: string,
};

type SetOrganizationType = {
  type: 'SET_ORGANIZATION',
  organization: OrganizationType,
};

type PubnubKeysType = {
  publish: string,
  subscribe: string,
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

type HereNowChannels = {
  [string]: HereNowUsers,
};

type HereNowUsers = {
  [string]: {
    available_prayer: boolean,
  },
};

type FeedType = {
  pubnubKeys: PubnubKeysType,
  event: EventType,
  organization: OrganizationType,
  channels: {
    [string]: ChannelType,
  },
  hereNow: HereNowChannels,
  currentChannel: string,
  currentUser: PrivateUserType,
  anchorMoment: AnchorMomentType | null,
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
  errors: Array<ErrorType>,
  notificationBanner: BannerType,
  sequence: any,
  isAuthenticated: boolean,
  auth: AuthenticationType
};

type ChangeChannelType = {
  type: 'CHANGE_CHANNEL',
  channel: string,
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
  pubnubToken: string,
  channel: string,
};

type SetEventType = {
  type: 'SET_EVENT',
  event: EventType,
}

type SetLanguageOptionsType = {
  type: 'SET_LANGUAGE_OPTIONS',
  languageOptions: Array<LanguageType>,
};

type SetPubnubKeysType = {
  type: 'SET_PUBNUB_KEYS',
  publish: string,
  subscribe: string,
};

type LoadHistoryType = {
  type: 'LOAD_HISTORY',
  channel: string,
  moments: MomentType,
};

type UserState = {
  available_prayer: boolean,
};

type UpdateHereNowType = {
  type: 'UPDATE_HERE_NOW',
  channel: string,
  userToken: string,
  state: UserState,
};

type RemoveHereNowType = {
  type: 'REMOVE_HERE_NOW',
  userToken: string,
  channel: string,
};

type AuthenticationType = {
  accessToken: string,
  refreshToken: string
}

type SetAuthenticationType = {
  type: 'SET_AUTHENTICATION',
  auth: AuthenticationType
};

type RemoveAuthenticationType = {
  type: 'REMOVE_AUTHENTICATION',
}
type ClearNotificationBannerType = {
  type: 'CLEAR_NOTIFICATION_BANNER',
}

type SetNotificationBannerType = {
  type: 'SET_NOTIFICATION_BANNER',
  message: string,
  bannerType: string,
}

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
  | ReceiveAcceptedPrayerRequestType
  | PublishReactionActionType
  | RemoveReactionType
  | ReceiveReactionType
  | SetEventType
  | SetVideoType
  | SetOrganizationType
  | SetPubnubKeysType
  | LeaveChannelType
  | PublishLeaveChannelType
  | SetScheduleType
  | UpdateHereNowType
  | RemoveHereNowType
  | SetAuthenticationType
  | RemoveAuthenticationType
  | AddErrorType
  | RemoveErrorType
  | SetScheduleDataType;

// Action Creators
const setAuthentication = (accessToken: string, refreshToken: string): SetAuthenticationType => (
  {
    type: SET_AUTHENTICATION,
    auth: {
      accessToken,
      refreshToken,
    },
  }
);

const removeAuthentication = (): RemoveAuthenticationType => (
  {
    type: REMOVE_AUTHENTICATION,
  }
);

const updateHereNow = (userToken: string, channel: string, state: UserState): UpdateHereNowType => (
  {
    type: UPDATE_HERE_NOW,
    channel,
    userToken,
    state,
  }
);

const removeHereNow = (userToken: string, channel: string): RemoveHereNowType => (
  {
    type: REMOVE_HERE_NOW,
    userToken,
    channel,
  }
);

const setLanguageOptions = (languageOptions: Array<LanguageType>): SetLanguageOptionsType => (
  {
    type: SET_LANGUAGE_OPTIONS,
    languageOptions,
  }
);

const setScheduleData = (time: number, data: any):SetScheduleDataType => (
  {
    type: SET_SCHEDULE_DATA,
    time,
    data,
  }
);

const setSchedule = (schedule: Array<ScheduleType>): SetScheduleType => (
  {
    type: SET_SCHEDULE,
    schedule,
  }
);

const setOrganization = (id: number, name: string): SetOrganizationType => (
  {
    type: SET_ORGANIZATION,
    organization: {
      id,
      name,
    },
  }
);

const setPubnubKeys = (publish: string, subscribe: string): SetPubnubKeysType => (
  {
    type: SET_PUBNUB_KEYS,
    publish,
    subscribe,
  }
);

const setEvent = (title: string, id: number, startTime: number): SetEventType => (
  {
    type: SET_EVENT,
    event: {
      title,
      id,
      startTime,
    },
  }
);

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

const changeChannel = (newChannel: string): ChangeChannelType => (
  {
    type: CHANGE_CHANNEL,
    channel: newChannel,
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

const loadHistory = (moments: MomentType, channel: string): LoadHistoryType => (
  {
    type: LOAD_HISTORY,
    channel,
    moments,
  }
);

const setNotificationBanner = (message: string, bannerType: string): SetNotificationBannerType => (
  {
    type: SET_NOTIFICATION_BANNER,
    message,
    bannerType,
  }
);

const clearNotificationBanner = (): ClearNotificationBannerType => (
  {
    type: CLEAR_NOTIFICATION_BANNER,
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
  },
  schedule: [],
  organization: {
    id: 0,
    name: '',
  },
  channels: {},
  hereNow: {},
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
  anchorMoment: null,
  isPlaceholderPresent: false,
  isPopUpModalVisible: false,
  isChatFocused: false,
  isSideMenuClosed: true,
  isVideoHidden: false,
  isLanguageSelectorVisible: false,
  isAuthenticated: false,
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
  notificationBanner: {
    message: '',
    bannerType: '',
  },
  sequence: {
    steps: [],
  },
  errors: [],
  auth: {
    accessToken: '',
    refreshToken: '',
  },
  persistExpiresAt: moment().add(1, 'months').format(),
};

// Reducer

const reducer = (
  state: FeedType = defaultState,
  action?: FeedActionTypes): FeedType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case UPDATE_HERE_NOW:
    return {
      ...state,
      hereNow: {
        ...state.hereNow,
        [action.channel]: {
          ...state.hereNow[action.channel],
          [action.userToken]: action.state,
        },
      },
    };
  case REMOVE_HERE_NOW:
    return {
      ...state,
      hereNow: {
        [action.channel]: objectFilter(
          state.hereNow[action.channel],
          // $FlowFixMe
          userToken => userToken === action.userToken
        ),
      },
    };
  case 'SET_SEQUENCE':
    return {
      ...state,
      sequence: action.sequence,
    };
  case SET_LANGUAGE_OPTIONS:
    return {
      ...state,
      languageOptions: action.languageOptions,
    };
  case SET_PUBNUB_KEYS:
    return {
      ...state,
      pubnubKeys: {
        publish: action.publish,
        subscribe: action.subscribe,
      },
    };
  case SET_ORGANIZATION:
    return {
      ...state,
      organization: action.organization,
    };
  case SET_EVENT :
    return {
      ...state,
      event: action.event,
    };
  case SET_SCHEDULE_DATA : {
    const newState = {
      ...state,
      sequence: {
        ...state.sequence,
        steps: [
          {
            ...state.sequence.steps[0],
            data: action.data,
          },
          ...state.sequence.steps.slice(1),
        ],
      },
    };
    return newState;
  }
  case SET_SCHEDULE :
    return {
      ...state,
      schedule: action.schedule,
    };
  case SET_AUTHENTICATION:
    return {
      ...state,
      auth: {
        accessToken: action.auth.accessToken,
        refreshToken: action.auth.refreshToken,
      },
      isAuthenticated: true,
    };
  case REMOVE_AUTHENTICATION:
    return {
      ...state,
      auth: {
        accessToken: '',
        refreshToken: '',
      },
      isAuthenticated: false,
    };
  case CHANGE_CHANNEL:
    if (!state.channels[action.channel]) {
      return state;
    }
    return {
      ...state,
      currentChannel: action.channel,
    };
  case 'CLEAR_CHANNEL':
    return {
      ...state,
      currentChannel: '',
    };
  case RECEIVE_MOMENT:
    // $FlowFixMe
    if (state.channels[action.channel]) {
      return {
        ...state,
        channels: {
          ...state.channels,
          // $FlowFixMe
          [action.channel]: {
            ...state.channels[action.channel],
            moments: [
              ...state.channels[action.channel].moments,
              // $FlowFixMe
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
    const publicChannel = getPublicChannel(state);

    const stateCopy = { ...state };
    if (action.channel === state.currentChannel) {
      if (state.channels[publicChannel]) {
        stateCopy.currentChannel = publicChannel;
      } else {
        stateCopy.currentChannel = '';
      }
    }
    delete stateCopy.channels[action.channel];
    return stateCopy;
  }
  case LOAD_HISTORY:
    if (state.channels[action.channel]) {
      return {
        ...state,
        channels: {
          ...state.channels,
          [action.channel]: {
            ...state.channels[action.channel],
            moments: [
              ...state.channels[action.channel].moments,
              ...action.moments,
            ],
          },
        },
      };
    }
    return state;
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
  case 'MUTE_USER':
  case 'DIRECT_CHAT':
  case CLOSE_MESSAGE_TRAY:
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
                messageTrayOpen: false,
              }
            )
          ),
        },
      },
    };
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
    const { id, channel } = action;
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
    const { id, channel } = action;
    const { channels } = state;
    const messageIndex = channels[channel].moments.findIndex(el => (
      el.id === id
    ));
    return {
      ...state,
      channels: {
        ...channels,
        [channel]: {
          ...channels[channel],
          moments: [
            ...channels[channel].moments.slice(0, messageIndex),
            ...channels[channel].moments.slice(messageIndex + 1),
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
    const publicChannel = getPublicChannel(state);
    if (currentChannel &&
      channels[currentChannel].participants &&
      channels[currentChannel].participants.length
    ) {
      const { participants } = channels[currentChannel];
      const userIndex = participants.findIndex(el => (
        // $FlowFixMe
        el.pubnubToken === action.pubnubToken
      ));
      if (participants) {
        // Flow complains that participants can still
        // be undefined here even though we already checked for them
        return {
          ...state,
          currentChannel: publicChannel,
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
  case SET_VIDEO:
    return {
      ...state,
      video: action.video,
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
  case ADD_ERROR:
    return {
      ...state,
      errors: [...state.errors, action.error],
    };
  case REMOVE_ERROR:
    return {
      ...state,
      // $FlowFixMe
      errors: state.errors.filter(error => error.id !== action.id),
    };
  case SET_NOTIFICATION_BANNER:
    return {
      ...state,
      notificationBanner: {
        message: action.message,
        bannerType: action.bannerType,
      },
    };
  case CLEAR_NOTIFICATION_BANNER:
    return {
      ...state,
      notificationBanner: {
        message: '',
        bannerType: '',
      },
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

const getCurrentChannel = (state: FeedType): string => (
  state.currentChannel
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
    }).filter(moment => moment.isMuted !== 'true') :
    []
);

const hasParticipants = (state: FeedType): boolean => {
  if (state.channels[state.currentChannel]) {
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
    && currentChannel.participants.length >= 2
  ) {
    const [ otherUser ] = currentChannel.participants.filter(
      participant => participant.pubnubToken !== state.currentUser.pubnubToken
    );
    return otherUser;
  }
  return null;
};

const getNotificationBanner = (state: FeedType): BannerType => (
  state.notificationBanner
);

// Exports

export {
  CHANGE_CHANNEL,
  ADD_CHANNEL,
  REMOVE_CHANNEL,
  INVITE_TO_CHANNEL,
  TOGGLE_POP_UP_MODAL,
  LEAVE_CHANNEL,
  GET_INIT_DATA,
  SET_NOTIFICATION_BANNER,
};
export {
  changeChannel,
  addChannel,
  removeChannel,
  feedContents,
  defaultState,
  receiveAcceptedPrayerRequest,
  hasParticipants,
  getOtherUser,
  getCurrentChannel,
  togglePopUpModal,
  leaveChannel,
  getCurrentUserAsSharedUser,
  getInitData,
  removeReaction,
  setUser,
  setEvent,
  setOrganization,
  setLanguageOptions,
  setPubnubKeys,
  loadHistory,
  setSchedule,
  getNotificationBanner,
  clearNotificationBanner,
  setNotificationBanner,
  setScheduleData,
  updateHereNow,
  removeHereNow,
  setAuthentication,
  removeAuthentication,
};
export type {
  AddChannelType,
  RemoveChannelType,
  MomentType,
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
  LanguageType,
  OrganizationType,
  SetNotificationBannerType,
};

export default reducer;
