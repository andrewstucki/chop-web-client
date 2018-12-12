// @flow
import type {
  OpenMessageTrayType,
  CloseMessageTrayType,
  DeleteMessageType,
  ToggleCloseTrayButtonType,
  MomentType,
  ReceiveMomentType,
  PublishLeaveChannelType,
  PublishAcceptedPrayerRequestType,
  ReceiveAcceptedPrayerRequestType,
} from '../moment';

import type {
  PublishReactionActionType,
  ReactionType,
} from '../reactions/reactionButton/dux';

import type {
  AnchorMomentType,
  PublishSalvationType,
  ReleaseAnchorMomentType,
} from '../anchorMoment/dux';

import { objectFilter } from '../util';

import {
  OPEN_MESSAGE_TRAY,
  CLOSE_MESSAGE_TRAY,
  DELETE_MESSAGE,
  TOGGLE_CLOSE_TRAY_BUTTON,
  MESSAGE,
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  RECEIVE_ACCEPTED_PRAYER_REQUEST,
  PUBLISH_MOMENT_TO_CHANNEL,
  RECEIVE_MOMENT,
  MUTE_USER,
} from '../moment';

import {
  SET_PANE_CONTENT,
} from '../pane/dux';

import type {
  PaneContentType,
} from '../pane/dux';

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
} from '../anchorMoment/dux';

import type { BannerType } from '../banner/dux';

import { SET_LANGUAGE } from '../languageSelector/dux';
import { getPublicChannel, getHostChannel } from '../selectors/channelSelectors';

import { ADD_ERROR, REMOVE_ERROR, CLEAR_ERRORS } from '../errors/dux';
import type { ErrorType, AddErrorType, RemoveErrorType } from '../errors/dux';
import moment from 'moment';

import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';

// Action Types

const CHANGE_CHANNEL = 'CHANGE_CHANNEL';
const ADD_CHANNEL = 'ADD_CHANNEL';
const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
const INVITE_TO_CHANNEL = 'INVITE_TO_CHANNEL';
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
const SET_SALVATIONS = 'SET_SALVATIONS';
const SET_SCHEDULE_DATA = 'SET_SCHEDULE_DATA';
const SET_CLIENT_INFO = 'SET_CLIENT_INFO';
const SET_HERE_NOW = 'SET_HERE_NOW';

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
  anchorMoments: Array<AnchorMomentType>,
};

type HereNowUsers = {
  [string]: {
    available_prayer: boolean,
  },
};

type HereNowChannels = {
  [string]: HereNowUsers,
};

type ClientInfoType = {
  countryCode?: string,
  countryName?: string,
  city?: string,
  postal?: string,
  latitude?: number,
  longitude?: number,
  ip?: string,
  state?: string,
}

type AuthenticationType = {
  accessToken: string,
  refreshToken: string
}

type FeedType = {
  pubnubKeys: PubnubKeysType,
  event: EventType,
  organization: OrganizationType,
  channels: {
    [string]: ChannelType,
  },
  hereNow: HereNowChannels,
  currentUser: PrivateUserType,
  animatingMoment: boolean,
  isPopUpModalVisible: boolean,
  isChatFocused: boolean,
  isSideMenuClosed: boolean,
  isVideoHidden: boolean,
  isLanguageSelectorVisible: boolean,
  video: VideoType,
  currentLanguage: string,
  languageOptions: Array<LanguageType>,
  reactions: Array<ReactionType>,
  salvations: number,
  errors: Array<ErrorType>,
  notificationBanner: BannerType,
  sequence: any,
  isAuthenticated: boolean,
  auth: AuthenticationType,
  panes: {
    [string]: PaneContentType,
  },
  clientInfo: ClientInfoType,
  mutedUsers: Array<string>,
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
  moments: Array<MomentType>,
};

type UserState = {
  available_prayer: boolean,
};

type HereNowUsersType = {
  [string]: UserState,
};

type SetHereNow = {
  type: 'SET_HERE_NOW',
  channel: string,
  users: HereNowUsersType
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

type SetSalvationsType = {
  type: 'SET_SALVATIONS',
  count: number,
};

type SetAuthenticationType = {
  type: 'SET_AUTHENTICATION',
  auth: AuthenticationType
};

type RemoveAuthenticationType = {
  type: 'REMOVE_AUTHENTICATION',
}
type ClearNotificationBannerType = {
  type: 'CLEAR_NOTIFICATION_BANNER',
};

type SetNotificationBannerType = {
  type: 'SET_NOTIFICATION_BANNER',
  message: string,
  bannerType: string,
};

type SetClientInfoType = {
  type: 'SET_CLIENT_INFO',
  data: ClientInfoType,
}

type FeedActionTypes =
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
  | PublishSalvationType
  | ReleaseAnchorMomentType
  | SetSalvationsType
  | RemoveHereNowType
  | SetAuthenticationType
  | RemoveAuthenticationType
  | AddErrorType
  | RemoveErrorType
  | SetScheduleDataType
  | SetClientInfoType
  | SetHereNow;

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

const setHereNow = (channel: string, users: HereNowUsersType): SetHereNow => (
  {
    type: SET_HERE_NOW,
    channel,
    users,
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

const setEvent = (title: string, id: number, startTime: number, videoStartTime: number): SetEventType => (
  {
    type: SET_EVENT,
    event: {
      title,
      id,
      startTime,
      videoStartTime,
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
      anchorMoments: [],
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

const loadHistory = (moments: Array<MomentType>, channel: string): LoadHistoryType => (
  {
    type: LOAD_HISTORY,
    channel,
    moments,
  }
);

const setSalvations = (count:number): SetSalvationsType => (
  {
    type: SET_SALVATIONS,
    count,
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

const setClientInfo = (data: ClientInfoType) => (
  {
    type: SET_CLIENT_INFO,
    data,
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
  animatingMoment: true,
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
  panes: {
    primary: {
      type: EVENT,
      channelId: '',
    },
  },
  reactions: [],
  notificationBanner: {
    message: '',
    bannerType: '',
  },
  sequence: {
    steps: [],
  },
  salvations: 0,
  errors: [],
  auth: {
    accessToken: '',
    refreshToken: '',
  },
  persistExpiresAt: moment().add(1, 'months').format(),
  clientInfo: {
    countryCode: '',
    countryName: '',
    city: '',
    postal: '',
    latitude: 0,
    longitude: 0,
    ip: '',
    state: '',
  },
  mutedUsers: [],
};

// Reducer

const reducer = (
  state: FeedType = defaultState,
  action?: FeedActionTypes): FeedType => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
  case SET_PANE_CONTENT:
    return {
      ...state,
      panes: {
        ...state.panes,
        [action.name]: action.content,
      },
    };
  case SET_HERE_NOW:
    return {
      ...state,
      hereNow: {
        ...state.hereNow,
        [action.channel]: action.users,
      },
    };
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
  case SET_SCHEDULE_DATA:
    return {
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
    const stateCopy = { ...state };
    delete stateCopy.channels[action.channel];

    const publicChannel = getPublicChannel(stateCopy);
    const hostChannel = getHostChannel(stateCopy);

    if (action.channel === state.panes.primary.channelId) {
      if (action.channel === publicChannel) {
        stateCopy.panes.primary = {
          channelId: hostChannel || '',
          type: CHAT,
        };
      } else {
        stateCopy.panes.primary = {
          channelId: publicChannel || '',
          type: EVENT,
        };
      }
    }

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
        [state.panes.primary.channelId]: {
          ...state.channels[state.panes.primary.channelId],
          moments: state.channels[state.panes.primary.channelId].moments.map(
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
  case MUTE_USER: {
    // $FlowFixMe
    const newArray = [...state.mutedUsers, action.nickname];
    return {
      ...state,
      // ensure no duplicates in the array
      mutedUsers: [...new Set(newArray)],
      channels: {
        ...state.channels,
        [state.panes.primary.channelId]: {
          ...state.channels[state.panes.primary.channelId],
          moments: state.channels[state.panes.primary.channelId].moments.map(
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
  }
  case 'DIRECT_CHAT':
  case CLOSE_MESSAGE_TRAY:
    return {
      ...state,
      channels: {
        ...state.channels,
        [state.panes.primary.channelId]: {
          ...state.channels[state.panes.primary.channelId],
          moments: state.channels[state.panes.primary.channelId].moments.map(
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
        [state.panes.primary.channelId]: {
          ...state.channels[state.panes.primary.channelId],
          moments: state.channels[state.panes.primary.channelId].moments.map(
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
    const { prayerChannel, hostChannel, cancelled } = action;
    const messageIndex = state.channels[hostChannel].moments.findIndex(el => (
      el.prayerChannel === prayerChannel && el.active === true
    ));
    if (messageIndex >= 0) {
      return {
        ...state,
        channels: {
          ...state.channels,
          // $FlowFixMe
          [hostChannel]: {
            // $FlowFixMe
            ...state.channels[hostChannel],
            // $FlowFixMe
            moments: [
              ...state.channels[hostChannel].moments.slice(0, messageIndex),
              {
                ...state.channels[hostChannel].moments[messageIndex],
                active: false,
                cancelled: cancelled,
              },
              ...state.channels[hostChannel].moments.slice(messageIndex + 1),
            ],
          },
        },
      };
    } else {
      return {
        ...state,
      };
    }
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
            [state.panes.primary.channelId]: {
              ...state.channels[state.panes.primary.channelId],
              moments: [
                ...state.channels[state.panes.primary.channelId].moments,
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
  case SET_ANCHOR_MOMENT: {
    const { channel, anchorMoment } = action;
    return {
      ...state,
      channels: {
        ...state.channels,
        [channel]: {
          ...state.channels[channel],
          anchorMoments: [
            ...state.channels[channel].anchorMoments,
            anchorMoment,
          ],
        },
      },
    };
  }
  case RELEASE_ANCHOR_MOMENT: {
    const { channels } = state;
    const messageIndex = channels[action.channel].anchorMoments.findIndex(el => (
      // $FlowFixMe
      el.id === action.id
    ));
    // $FlowFixMe
    const moment = channels[action.channel].anchorMoments.find(anchorMoment => anchorMoment.id === action.id);
    return {
      ...state,
      channels: {
        ...state.channels,
        [action.channel]: {
          ...state.channels[action.channel],
          moments: [
            ...state.channels[action.channel].moments,
            moment,
          ],
          anchorMoments: [
            ...channels[action.channel].anchorMoments.slice(0, messageIndex),
            ...channels[action.channel].anchorMoments.slice(messageIndex + 1),
          ],
        },
      },
    };
  }
  case TOGGLE_POP_UP_MODAL: {
    return {
      ...state,
      isPopUpModalVisible: !state.isPopUpModalVisible,
    };
  }
  case LEAVE_CHANNEL: {
    const { channels } = state;
    const { channelId:currentChannel } = state.panes.primary;
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
          panes: {
            primary: {
              type: EVENT,
              channelId: publicChannel,
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
  case SET_SALVATIONS:
    return {
      ...state,
      salvations: action.count,
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
  case CLEAR_ERRORS:
    return {
      ...state,
      errors: [],
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
  case SET_CLIENT_INFO:
    return {
      ...state,
      clientInfo: action.data,
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
  addChannel,
  removeChannel,
  defaultState,
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
  setSalvations,
  setAuthentication,
  removeAuthentication,
  setClientInfo,
  setHereNow,
};
export type {
  AddChannelType,
  RemoveChannelType,
  MomentType,
  FeedType,
  InviteToChannelType,
  ChannelType,
  PrivateUserType,
  SharedUserType,
  TogglePopUpModalType,
  LeaveChannelType,
  GetInitData,
  LanguageType,
  OrganizationType,
  SetSalvationsType,
  SetNotificationBannerType,
  ClientInfoType,
};

export default reducer;
