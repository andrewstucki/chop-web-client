// @flow
import type {
  ToggleMessageTrayType,
  DeleteMessageType,
  ToggleCloseTrayButtonType,
  ReceiveMomentType,
  PublishAcceptedPrayerRequestType,
  ReceiveAcceptedPrayerRequestType,
} from '../moment';

import type {
  AddMomentToChannelType,
  MomentType,
} from '../moment/dux';

import type {
  PublishReactionActionType,
  ReactionType,
} from '../reactions/reactionButton/dux';

import type {
  AnchorMomentType,
  PublishSalvationType,
  ReleaseAnchorMomentType,
} from '../anchorMoment/dux';

import {
  TOGGLE_MESSAGE_TRAY,
  DELETE_MESSAGE,
  MESSAGE,
  PUBLISH_ACCEPTED_PRAYER_REQUEST,
  RECEIVE_ACCEPTED_PRAYER_REQUEST,
  PUBLISH_MOMENT_TO_CHANNEL,
  RECEIVE_MOMENT,
  RECEIVE_MUTE_USER,
} from '../moment';

import {
  SET_PANE_CONTENT,
} from '../pane/dux';

import type {
  PaneType,
  SetPaneType,
} from '../pane/dux';

import {
  PUBLISH_REACTION,
} from '../reactions/reactionButton/dux';

import {
  OPEN_SIDE_MENU,
  CLOSE_SIDE_MENU,
} from '../sideMenu/dux';

import { SET_CHAT_FOCUS } from '../chat/dux';
import type { SetChatFocusType } from '../chat/dux';

import { SET_VIDEO, TOGGLE_HIDE_VIDEO } from '../videoFeed/dux';
import type { SetVideoType, VideoType, ToggleHideVideoType } from '../videoFeed/dux';

import {TOGGLE_NAV_MENU_EXPANDED} from '../navMenu/dux';
import type {ToggleNavMenuExpandedType} from '../navMenu/dux';

import {
  RELEASE_ANCHOR_MOMENT,
  SET_ANCHOR_MOMENT,
} from '../anchorMoment/dux';

import {
  TOGGLE_POP_UP_MODAL,
} from '../popUpModal/dux';

import type {
  PopUpModalType,
} from '../popUpModal/dux';

import type { BannerType } from '../banner/dux';

import { SET_LANGUAGE } from '../languageSelector/dux';
import {
  getPublicChannel,
  getHostChannel,
  getCurrentChannel,
} from '../selectors/channelSelectors';

import { ADD_ERROR, REMOVE_ERROR, CLEAR_ERRORS } from '../errors/dux';
import type { ErrorType, AddErrorType, RemoveErrorType } from '../errors/dux';
import dayjs from 'dayjs';

import { EVENT } from '../pane/content/event/dux';
import { CHAT } from '../pane/content/chat/dux';

import type {
  DateTimeType,
  ChannelIdType,
} from '../cwc-types';

import type { SetNavbarIndexType } from '../navbar/dux';

import {
  SET_NAVBAR_INDEX,
} from '../navbar/dux';
import type {
  SharedUserType,
  UpdateUserSucceededType,
  PrivateUserType,
} from '../users/dux';

import { createUid } from '../util';
import { ADD_MOMENT_TO_CHANNEL } from '../moment/dux';
import { UPDATE_USER_SUCCEEDED } from '../users/dux';
import { COMPACT } from '../textModeToggle/dux';
import { HOST_INFO } from '../hostInfo/dux';
import { BIBLE, SCHEDULE, NOTES, type TabType} from '../pane/content/tab/dux';

// Action Types

const ADD_CHANNEL = 'ADD_CHANNEL';
const REMOVE_CHANNEL = 'REMOVE_CHANNEL';
const LEAVE_CHANNEL_SUCCEEDED = 'LEAVE_CHANNEL_SUCCEEDED';
const LEAVE_CHANNEL_FAILED = 'LEAVE_CHANNEL_FAILED';
const LEAVE_CHANNEL = 'LEAVE_CHANNEL';
const REMOVE_REACTION = 'REMOVE_REACTION';
const RECEIVE_REACTION = 'RECEIVE_REACTION';
const SET_USER = 'SET_USER';
const SET_EVENT = 'SET_EVENT';
const SET_ORGANIZATION = 'SET_ORGANIZATION';
const SET_PUBNUB_KEYS = 'SET_PUBNUB_KEYS';
const SET_LANGUAGE_OPTIONS = 'SET_LANGUAGE_OPTIONS';
const LOAD_HISTORY = 'LOAD_HISTORY';
const SET_AUTHENTICATION = 'SET_AUTHENTICATION';
const REMOVE_AUTHENTICATION = 'REMOVE_AUTHENTICATION';
const CLEAR_NOTIFICATION_BANNER = 'CLEAR_NOTIFICATION_BANNER';
const SET_NOTIFICATION_BANNER = 'SET_NOTIFICATION_BANNER';
const REMOVE_HERE_NOW = 'REMOVE_HERE_NOW';
const UPDATE_HERE_NOW = 'UPDATE_HERE_NOW';
const SET_SALVATIONS = 'SET_SALVATIONS';
const UPDATE_SCROLL_POSITION = 'UPDATE_SCROLL_POSITION';
const SET_CLIENT_INFO = 'SET_CLIENT_INFO';
const SET_HERE_NOW = 'SET_HERE_NOW';
const ADD_HERE_NOW = 'ADD_HERE_NOW';
const SET_SAW_LAST_MOMENT_AT = 'SET_SAW_LAST_MOMENT_AT';
const QUERY_CURRENT_EVENT = 'QUERY_CURRENT_EVENT';
const QUERY_CURRENT_EVENT_FAILED = 'QUERY_CURRENT_EVENT_FAILED';
const TOKEN_AUTH_LOGIN_FAILED = 'TOKEN_AUTH_LOGIN_FAILED';
const SET_CHANNELS = 'SET_CHANNELS';
const JOIN_CHANNEL = 'JOIN_CHANNEL';
const JOIN_CHANNEL_FAILED = 'JOIN_CHANNEL_FAILED';

// Flow Type Definitions

type EventType = {
  title: string,
  id: string,
  eventTimeId: string,
  startTime: number,
  endTime: number,
  description?: string,
  hostInfo?: string,
  speaker?: string,
  hostInfo?: string,
};

type LanguageType = {
  name: string,
  code: string,
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

type ChannelTypeType = 'prayer' | 'host' | 'direct' | 'legacy' | 'public';

type ChannelType = {
  id: string,
  name: string,
  type: ChannelTypeType,
  direct: boolean,
  placeholder: boolean,
  moments: Array<MomentType>,
  participants: Array<SharedUserType>,
  anchorMoments: Array<AnchorMomentType>,
  scrollPosition: number,
  sawLastMomentAt: DateTimeType,
};

type HereNowChannels = {
  [string]: Array<UserState>,
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
};

type AuthenticationType = {
  accessToken: string,
  refreshToken: string,
};

type ChannelsObjectType = {
  [string]: ChannelType,
};

type NavType = {
  expanded: boolean,
};

type QueryCurrentEventType = {
  type: typeof QUERY_CURRENT_EVENT,
}

type FeedType = {
  pubnubKeys: PubnubKeysType,
  event: EventType,
  organization: OrganizationType,
  channels: ChannelsObjectType,
  hereNow: HereNowChannels,
  currentUser: PrivateUserType,
  isPopUpModalVisible: boolean,
  focusedChannel: string,
  isSideMenuClosed: boolean,
  isVideoHidden: boolean,
  isLanguageSelectorVisible: boolean,
  isVideoPlaying: boolean,
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
    [string]: PaneType,
  },
  clientInfo: ClientInfoType,
  mutedUsers: Array<string>,
  navbarIndex: number,
  prevNavbarIndex?: number,
  lastAction?: FeedActionTypes,
  popUpModal: PopUpModalType,
  nav: NavType,
  tabs: Array<TabType>,
};

type AddChannelType = {
  type: 'ADD_CHANNEL',
  channel: ChannelType,
};

type RemoveChannelType = {
  type: 'REMOVE_CHANNEL',
  channel: string,
};

type SetChannelsType = {
  type: typeof SET_CHANNELS,
  channels: ChannelsObjectType,
}

type LeaveChannelType = {
  type: 'LEAVE_CHANNEL',
  channel: string,
};

type SetEventType = {
  type: 'SET_EVENT',
  event: EventType,
};

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
  id: string,
  state: {
    available_prayer?: boolean,
  }
};

type SetHereNow = {
  type: typeof SET_HERE_NOW,
  channel: string,
  users: Array<UserState>,
};

type AddHereNowType = {
  type: typeof ADD_HERE_NOW,
  channel: string,
  user: UserState,
};

type RemoveHereNowType = {
  type: typeof REMOVE_HERE_NOW,
  channel: string,
  userToken: string,
};

type SetSalvationsType = {
  type: 'SET_SALVATIONS',
  count: number,
};

type SetAuthenticationType = {
  type: 'SET_AUTHENTICATION',
  auth: AuthenticationType,
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

type UpdateScrollPositionType = {
  type: 'UPDATE_SCROLL_POSITION',
  scrollPosition: number,
  channel: string,
  timestamp: number,
};

type SetClientInfoType = {
  type: 'SET_CLIENT_INFO',
  data: ClientInfoType,
};

type SetSawLastMomentAt = {
  type: typeof SET_SAW_LAST_MOMENT_AT,
  timestamp: DateTimeType,
  channelId: ChannelIdType,
};

type JoinChannelType = {
  type: typeof JOIN_CHANNEL,
  channel: string,
  requesterPubnubToken: string,
  requesterNickname: string,
};

type FeedActionTypes =
  | ReceiveMomentType
  | AddChannelType
  | RemoveChannelType
  | SetUser
  | ToggleMessageTrayType
  | DeleteMessageType
  | ToggleCloseTrayButtonType
  | PublishAcceptedPrayerRequestType
  | ReceiveAcceptedPrayerRequestType
  | PublishReactionActionType
  | RemoveReactionType
  | ReceiveReactionType
  | SetEventType
  | SetVideoType
  | SetOrganizationType
  | SetPubnubKeysType
  | LeaveChannelType
  | AddHereNowType
  | PublishSalvationType
  | ReleaseAnchorMomentType
  | SetSalvationsType
  | RemoveHereNowType
  | SetAuthenticationType
  | RemoveAuthenticationType
  | AddErrorType
  | RemoveErrorType
  | SetClientInfoType
  | SetHereNow
  | SetSawLastMomentAt
  | ToggleHideVideoType
  | SetNavbarIndexType
  | SetPaneType
  | ToggleNavMenuExpandedType
  | SetChatFocusType
  | SetChannelsType
  | AddMomentToChannelType
  | UpdateUserSucceededType;

// Action Creators
const queryCurrentEvent = (): QueryCurrentEventType => (
  {
    type: QUERY_CURRENT_EVENT,
  }
);

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

const setHereNow = (channel: string, users: Array<UserState>): SetHereNow => (
  {
    type: SET_HERE_NOW,
    channel,
    users,
  }
);

const addHereNow = (channel: string, user: UserState): AddHereNowType => (
  {
    type: ADD_HERE_NOW,
    channel,
    user,
  }
);

const removeHereNow = (channel: string, userToken: string): RemoveHereNowType => (
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

const setEvent = (title: string, id: string, eventTimeId: string, startTime: number, endTime: number, videoStartTime: number,
  speaker: string, description: string, hostInfo: string): SetEventType => (
  {
    type: SET_EVENT,
    event: {
      title,
      id,
      eventTimeId,
      startTime,
      endTime,
      videoStartTime,
      speaker,
      description,
      hostInfo,
    },
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
  type: ChannelTypeType,
  direct: boolean,
  participants?: Array<SharedUserType> = [],
  placeholder?: boolean = false,
): AddChannelType => (
  {
    type: ADD_CHANNEL,
    channel: {
      id,
      name,
      type,
      direct,
      placeholder,
      moments: [],
      participants,
      anchorMoments: [],
      scrollPosition: 0,
      sawLastMomentAt: Date.now(),
    },
  }
);

const addPlaceholderChannel = (
  otherUser:SharedUserType
): AddChannelType => (
  {
    type: ADD_CHANNEL,
    channel: {
      id: createUid(),
      name: 'Direct',
      type: 'direct',
      direct: true,
      placeholder: true,
      moments: [],
      participants: [otherUser],
      anchorMoments: [],
      scrollPosition: 0,
      sawLastMomentAt: Date.now(),
    },
  }
);

const removeChannel = (channel: string): RemoveChannelType => (
  {
    type: REMOVE_CHANNEL,
    channel,
  }
);

const setChannels = (
  channels: ChannelsObjectType,
): SetChannelsType => (
  {
    type: SET_CHANNELS,
    channels,
  }
);

const joinChannel = (channel: string, requesterPubnubToken: string, requesterNickname: string):JoinChannelType => (
  {
    type: JOIN_CHANNEL,
    channel,
    requesterPubnubToken,
    requesterNickname,
  }
);

const leaveChannel = (channel: string): LeaveChannelType => (
  {
    type: LEAVE_CHANNEL,
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

const clearNotificationBanner = (): ClearNotificationBannerType => (
  {
    type: CLEAR_NOTIFICATION_BANNER,
  }
);

const updateScrollPosition = (scrollPosition: number, channel: string, timestamp: number): UpdateScrollPositionType => (
  {
    type: UPDATE_SCROLL_POSITION,
    scrollPosition,
    channel,
    timestamp,
  }
);

const setClientInfo = (data: ClientInfoType) => (
  {
    type: SET_CLIENT_INFO,
    data,
  }
);

const defaultState = {
  pubnubKeys: {
    publish: '',
    subscribe: '',
  },
  event: {
    id: '',
    eventTimeId: '',
    startTime: 0,
    endTime: 0,
    title: '',
    hostInfo: '',
  },
  organization: {
    id: 0,
    name: '',
  },
  channels: {},
  hereNow: {},
  currentUser: {
    id: 0,
    name: '',
    pubnubToken: '',
    pubnubAccessKey: '',
    avatar: null,
    role: {
      label: '',
      permissions: [],
    },
    preferences: {
      textMode: COMPACT,
    },
  },
  isPopUpModalVisible: false,
  focusedChannel: '',
  isSideMenuClosed: true,
  isVideoHidden: false,
  isLanguageSelectorVisible: false,
  isAuthenticated: false,
  isVideoPlaying: false,
  video: {
    type: 'none',
    url: '',
  },
  currentLanguage: 'en-US',
  languageOptions: [
    {
      code: 'en-US',
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
      content: {
        channelId: 'event',
      },
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
  persistExpiresAt: dayjs().add(1, 'month').format(),
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
  navbarIndex: 0,
  prevNavbarIndex: undefined,
  popUpModal: {},
  nav: {
    expanded: true,
  },
  tabs: [
    HOST_INFO,
    BIBLE,
    SCHEDULE,
    NOTES,
  ],
};

// Reducer

const reducer = (
  inboundState: FeedType = defaultState,
  action?: FeedActionTypes): FeedType => {
  if (!action || !action.type) {
    return inboundState;
  }
  const state = {
    ...inboundState,
    lastAction: { ...action},
  };
  switch (action.type) {
    case SET_PANE_CONTENT: {
      const currentChannel = getCurrentChannel(state);
      if (currentChannel === 'event' || currentChannel === '') {
        return {
          ...state,
          panes: {
            ...state.panes,
            [action.name]: action.pane,
          },
        };
      } else {
        return {
          ...state,
          channels: {
            ...state.channels,
            [currentChannel]: {
              ...state.channels[currentChannel],
              sawLastMomentAt: state.channels[currentChannel] &&
                state.channels[currentChannel].sawLastMomentAt > 0 ?
                state.channels[currentChannel].sawLastMomentAt : new Date().getTime(),
            },
          },
          panes: {
            ...state.panes,
            [action.name]: action.pane,
          },
        };
      }
    }
    case SET_HERE_NOW:
      return {
        ...state,
        hereNow: {
          ...state.hereNow,
          [action.channel]: action.users,
        },
      };
    case ADD_HERE_NOW:
      return {
        ...state,
        hereNow: {
          ...state.hereNow,
          [action.channel]: [
            ...state.hereNow[action.channel] || [],
            action.user,
          ],
        },
      };
    case UPDATE_HERE_NOW: {
      const { user } = action;
      return {
        ...state,
        hereNow: {
          ...state.hereNow,
          [action.channel]: (state.hereNow[action.channel] || []).map(item => (
            item.id === user.id ? user : item
          )),
        },
      };
    }
    case REMOVE_HERE_NOW: {
      if (state.hereNow[action.channel]) {
        const { userToken } = action;
        return {
          ...state,
          hereNow: {
            ...state.hereNow,
            [action.channel]: state.hereNow[action.channel].filter(item => item.id !==  userToken),
          },
        };
      } else {
        return state;
      }
    }
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
    case RECEIVE_MOMENT: {
    // $FlowFixMe
      const { channel:channelId, moment }: { channelId: string, moment: MomentType } = action;
      if (state.channels[channelId]) {
        return {
          ...state,
          channels: {
            ...state.channels,
            [channelId]: {
              ...state.channels[channelId],
              moments: [
                ...state.channels[channelId].moments,
                moment,
              ],
            },
          },
        };
      }
      return state;
    }
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
    case LEAVE_CHANNEL:
    case REMOVE_CHANNEL: {
      const { channel: deletedChannelId } = action;
      const { [deletedChannelId]: _channel, ...updatedChannels } = state.channels;
      const publicChannelId = getPublicChannel(state);
      const hostChannelId = getHostChannel(state);
      const currentChannelId = getCurrentChannel(state);

      const publicChannelPane = {
        type: EVENT,
        content: {
          channelId: publicChannelId,
        },
      };

      const hostChannelPane = {
        type: CHAT,
        content: {
          channelId: hostChannelId,
        },
      };

      let newPane = {
        type: EVENT,
        content: {
          channelId: 'event',
        },
      };

      if (deletedChannelId === currentChannelId) {
        if (deletedChannelId === publicChannelId && hostChannelId) {
          newPane = hostChannelPane;
        } else if (publicChannelId) {
          newPane = publicChannelPane;
        }
      }

      return {
        ...state,
        channels: updatedChannels,
        panes: {
          ... state.panes,
          primary: newPane,
        },
      };
    }
    case SET_CHANNELS:
      return {
        ...state,
        channels: action.channels,
      };
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
    case TOGGLE_MESSAGE_TRAY: {
      // $FlowFixMe
      const { channel, id } = action;
      if (state.channels[channel]) {
        return {
          ...state,
          channels: {
            ...state.channels,
            [channel]: {
              ...state.channels[channel],
              moments: state.channels[channel].moments.map(
                message => {
                  if (message.id === id) {
                    return {
                      ...message,
                      messageTrayOpen: !message.messageTrayOpen,
                    };
                  } else {
                    return {
                      ...message,
                      messageTrayOpen: false,
                    };
                  }
                }
              ),
            },
          },
        };
      } else {
        return state;
      }
    }
    case RECEIVE_MUTE_USER: {
    // $FlowFixMe
      const newArray = [...state.mutedUsers, action.nickname];
      return {
        ...state,
        // ensure no duplicates in the array
        mutedUsers: [...new Set(newArray)],
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
    case ADD_MOMENT_TO_CHANNEL:
    case PUBLISH_MOMENT_TO_CHANNEL: {
      // $FlowFixMe
      if (action.moment.type === MESSAGE) {
        if ([action.moment.text].toString().length > 0) {
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
      const { id, channel } = action;
      const messageIndex = channels[channel].anchorMoments.findIndex(el => (
        el.id === id
      ));
      const moment = channels[channel].anchorMoments.find(anchorMoment => anchorMoment.id === id);
      return {
        ...state,
        channels: {
          ...state.channels,
          [channel]: {
            ...state.channels[channel],
            moments: [
              ...state.channels[channel].moments,
              moment,
            ],
            anchorMoments: [
              ...channels[channel].anchorMoments.slice(0, messageIndex),
              ...channels[channel].anchorMoments.slice(messageIndex + 1),
            ],
          },
        },
      };
    }
    case TOGGLE_POP_UP_MODAL: {
      return {
        ...state,
        isPopUpModalVisible: !state.isPopUpModalVisible,
        // $FlowFixMe
        popUpModal: action.modal,
      };
    }
    case 'SET_AVATAR': {
      const user: PrivateUserType = state.currentUser;
      return {
        ...state,
        currentUser: {
          ...user,
          avatar: action.url,
        },
      };
    }
    case SET_CHAT_FOCUS:
      return {
        ...state,
        focusedChannel: action.channel,
      };
    case TOGGLE_HIDE_VIDEO:
      return {
        ...state,
        isVideoHidden: action.hidden,
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
    case REMOVE_REACTION: {
      const { id } = action;
      return {
        ...state,
        reactions: state.reactions.filter(reaction => reaction.id !== id),
      };
    }
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
    case REMOVE_ERROR: {
      const { id } = action;
      return {
        ...state,
        errors: state.errors.filter(error => error.id !== id),
      };
    }
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
    case UPDATE_SCROLL_POSITION: {
      const { scrollPosition, channel, timestamp } = action;
      if (!state.channels[channel]) {
        return state;
      }
      return {
        ...state,
        channels: {
          ...state.channels,
          [channel]: {
            ...state.channels[channel],
            scrollPosition: scrollPosition,
            sawLastMomentAt: scrollPosition < 10 ? timestamp : state.channels[channel].sawLastMomentAt,
          },
        },
      };
    }
    case TOGGLE_NAV_MENU_EXPANDED:
      return {
        ...state,
        nav: {
          ...state.nav,
          expanded: !state.nav.expanded,
        },
      };
    case SET_CLIENT_INFO:
      return {
        ...state,
        clientInfo: action.data,
      };
    case 'PLAY_VIDEO':
      return {
        ...state,
        isVideoPlaying: true,
      };
    case 'PAUSE_VIDEO':
      return {
        ...state,
        isVideoPlaying: false,
      };
    case SET_NAVBAR_INDEX:
      return {
        ...state,
        navbarIndex: action.index,
        prevNavbarIndex: state.navbarIndex,
      };
    case UPDATE_USER_SUCCEEDED: {
      const { user } = action;
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          preferences: {
            ...user.preferences,
          },
        },
      };
    }
    default:
      return inboundState;
  }
};

// Selectors

const getNotificationBanner = (state: FeedType): BannerType => (
  state.notificationBanner
);

// Exports

export {
  ADD_CHANNEL,
  REMOVE_CHANNEL,
  LEAVE_CHANNEL,
  SET_NOTIFICATION_BANNER,
  LEAVE_CHANNEL_SUCCEEDED,
  LEAVE_CHANNEL_FAILED,
  SET_AUTHENTICATION,
  QUERY_CURRENT_EVENT,
  QUERY_CURRENT_EVENT_FAILED,
  TOKEN_AUTH_LOGIN_FAILED,
  SET_CHANNELS,
  JOIN_CHANNEL,
  JOIN_CHANNEL_FAILED,
};
export {
  defaultState,
  addChannel,
  removeChannel,
  joinChannel,
  addPlaceholderChannel,
  leaveChannel,
  removeReaction,
  setUser,
  setEvent,
  setOrganization,
  setLanguageOptions,
  setPubnubKeys,
  loadHistory,
  getNotificationBanner,
  clearNotificationBanner,
  removeHereNow,
  setSalvations,
  setAuthentication,
  removeAuthentication,
  updateScrollPosition,
  setClientInfo,
  setHereNow,
  addHereNow,
  queryCurrentEvent,
  setChannels,
};

export type {
  AddChannelType,
  AuthenticationType,
  RemoveChannelType,
  MomentType,
  FeedType,
  ChannelType,
  LeaveChannelType,
  LanguageType,
  OrganizationType,
  SetSalvationsType,
  SetNotificationBannerType,
  ClientInfoType,
  ChannelsObjectType,
  QueryCurrentEventType,
  HereNowChannels,
  UserState,
  SetUser,
  JoinChannelType,
  ChannelTypeType,
};

export default reducer;
