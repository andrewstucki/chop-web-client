// @flow
import { GraphQLClient } from 'graphql-request';
import { hostname } from './location';
import type { VideoTypeType } from '../videoFeed/dux';
import type { URLType } from '../cwc-types';
import type { SubscriberInputType } from '../subscriber/dux';
import Cookie from 'js-cookie';

declare var GATEWAY_HOST: string;

// By default GraphQL types are Nullable
type GraphQLString = string | null;
type GraphQLID = string | null;
type GraphQLInt = number | null;
type GraphQLBoolean = boolean | null;

export type GraphQLThemeType = {
  headerBackgroundColor: GraphQLString,
  headerMenuIconColor: GraphQLString,
};

export type GraphQLOrganizationType = {
  currentOrganization: {
    id: number,
    name: GraphQLString,
    logoUrl:GraphQLString,
    theme: ?GraphQLThemeType,
  }
};

export type GraphQLParticipantsType = {
  id: string,
  avatar: GraphQLString,
  nickname: GraphQLString,
};

export type GraphQLChannelType = {
  id: string,
  name: GraphQLString,
  type: GraphQLString,
  direct: GraphQLBoolean,
  subscribers: Array<GraphQLParticipantsType>,
};

export type GraphQLEventTimeType = {
  id: GraphQLID,
};

export type GraphQLVideoType = {
  type: VideoTypeType,
  url: URLType,
};

export type GraphQLSequenceStepType = {
  fetchTime: number,
  queries: Array<string>,
  transitionTime: number,
};

export type GraphQLSequenceType = {
  serverTime: number,
  steps: Array<GraphQLSequenceStepType>,
};

type GraphQLLanguageItemType = {
  name: string,
  code: string,
};

export type GraphQLLanguageType = {
  currentLanguages: Array<GraphQLLanguageItemType>
}

export type GraphQLPermission = {
  key: string,
};

export type GraphQlRole = {
  label: string,
  permissions: Array<GraphQLPermission>,
};

export type GraphQlPreferences = {|
  textMode: string,
|};

export type GraphQLSubscriberType = {
  currentSubscriber: {
    userId: number, // Only needed to pass to legacy when creating a message
    avatar: GraphQLString,
    id: string,
    nickname: GraphQLString,
    firstName: GraphQLString,
    lastName: GraphQLString,
    email: GraphQLString,
    phoneNumber: GraphQLString,
    pubnubAccessKey: GraphQLString,
    role: GraphQlRole,
    preferences: GraphQlPreferences,
  } | null
};

export type GraphQLPubnubKeys = {
  pubnubKeys: {
    publishKey: string,
    subscribeKey: string,
  }
};

export type GraphQLEnabledFeatures = {
  chat: boolean,
}

export type GraphQLEventType = {
  description: GraphQLString,
  endTime: GraphQLInt,
  scheduleTime: GraphQLInt,
  eventTime: GraphQLEventTimeType,
  hostInfo: GraphQLString,
  id: GraphQLString,
  sequence: GraphQLSequenceType,
  speaker: GraphQLString,
  startTime: GraphQLInt,
  title: GraphQLString,
  videoStartTime: GraphQLInt,
  video: GraphQLVideoType,
  feed: Array<GraphQLChannelType>,
  enabledFeatures: GraphQLEnabledFeatures,
  eventNotes: GraphQLString,
};

export type GraphQLCurrentEventType = {
  currentEvent: GraphQLEventType,
};

export type GraphQLEventAtType = {|
  description: GraphQLString,
  endTime: GraphQLInt,
  scheduleTime: GraphQLInt,
  eventTime: GraphQLEventTimeType,
  hostInfo: GraphQLString,
  id: GraphQLString,
  speaker: GraphQLString,
  startTime: GraphQLInt,
  title: GraphQLString,
  videoStartTime: GraphQLInt,
  video: GraphQLVideoType,
  feed: Array<GraphQLChannelType>,
|};

export type GraphQLEventAtTimeType = {
  eventAt: GraphQLEventAtType,
};

export type GraphQLScheduleItem = {
  id: string,
  startTime: GraphQLInt,
  endTime: GraphQLInt,
  title: GraphQLString,
  fetchTime: GraphQLInt,
  scheduleTime: GraphQLInt,
  hostInfo: GraphQLString,
}

export type GraphQLSchedule = {
  schedule: Array<GraphQLScheduleItem>,
};

export type GraphQLCurrentStateType =
  GraphQLCurrentEventType &
  GraphQLOrganizationType &
  GraphQLLanguageType &
  GraphQLSubscriberType &
  GraphQLPubnubKeys &
  GraphQLSchedule;

export type GraphQLAcceptPrayer = {
  acceptPrayer: boolean,
}

export type GraphQLMuteSubscriberType = {
  muteSubscriber: boolean,
}

export type GraphQLLeaveChannelType = {
  leaveChannel: boolean,
}

export type GraphQLDirectChatType = {
  createDirectFeed: GraphQLChannelType,
}

export type GraphQLGeneratePdfType = {
  generatePdf: GraphQLString,
};

export type GraphQLRequestPasswordResetType = {
  requestPasswordReset: GraphQLString,
};

export type GraphQLResetPasswordType = {
  resetPassword: GraphQLString,
};

export type GraphQLRequestLivePrayerType = {
  requestLivePrayer: GraphQLString,
};

const sequence = `
query Sequence($time: Timestamp) {
  eventAt(time: $time) {
    sequence {
      serverTime
      steps {
        fetchTime
        transitionTime
        queries
      }
    }
  }
}`;

const currentEvent = `
currentEvent {
  id
  title
  speaker
  description
  hostInfo
  eventNotes
  eventTime {
    id
  }
  startTime
  endTime
  scheduleTime
  videoStartTime
  sequence {
    serverTime
    steps {
      fetchTime
      queries
      transitionTime
    }
  }
  video {
    type
    url
  }
  feed {
    id
    name
    type
    direct
    subscribers {
      id
      avatar
      nickname
    }
  }
  enabledFeatures {
    chat
  }
}`;

const eventAt = `
query EventAt($time: Timestamp) {
  eventAt (time: $time){
    id
    title
    speaker
    description
    hostInfo
    eventTime {
      id
    }
    startTime
    endTime
    scheduleTime
    videoStartTime
    video {
      type
      url
    }
    feed {
      id
      name
      direct
      type
      subscribers {
        id
        avatar
        nickname
      }
    }
  }
}`;

const currentSubscriber = `
currentSubscriber {
  userId
  id
  nickname
  avatar
  firstName
  lastName
  email
  phoneNumber
  role {
    label
    permissions {
      key
    }
  }
  preferences {
    textMode
  }
}`;

const currentOrganization = `
currentOrganization {
  id
  name
  logoUrl
  theme {
    headerBackgroundColor
    headerMenuIconColor
  }
}`;

const pubnubKeys = `
pubnubKeys {
  publishKey
  subscribeKey
}`;

const currentLanguages = `
currentLanguages @include(if: $needLanguages) {
  name
  code
}`;

const acceptPrayer = `
mutation AcceptPrayer($channelToken: String!, $requesterPubnubToken: String!, $requesterNickname: String!) {
  acceptPrayer(channelToken: $channelToken, requesterPubnubToken: $requesterPubnubToken, requesterNickname: $requesterNickname) {
    id
    name
    type
    direct
    subscribers {
      id
      userId
      avatar
      nickname
    }
  }
}
`;

const muteSubscriber = ` 
mutation muteSubscriber($channelToken: String!, $nickname: String!) {
  muteSubscriber(channelToken: $channelToken, nickname: $nickname, clientIp: "0.0.0.0")
}
`;

const leaveChannel = `
mutation leaveChannel($channelToken: String!) {
  leaveChannel(channelToken: $channelToken)
}
`;

const createDirectChannel = `
mutation CreateDirectChannel($pubnubToken: String!, $nickname: String!) {
  createDirectChannel(targetPubnubToken: $pubnubToken, targetNickname: $nickname) {
    id
    name
    type
    direct
    subscribers {
      userId
      avatar
      nickname
      id
    }
  }
}`;

const schedule = `
schedule(limit: $limit) {
  id
  startTime
  endTime
  title
  fetchTime
  scheduleTime
  hostInfo
}`;

const scheduleQuery = `
query Schedule($limit: Int) {
	${schedule}
}`;

const joinChannel = `
mutation joinChannel($channelToken: String!, $requesterPubnubToken: String!, $requesterNickname: String!) {
  joinChannel(channelToken: $channelToken, requesterPubnubToken: $requesterPubnubToken, requesterNickname: $requesterNickname) {
    id
    name
    direct
    type
    subscribers {
      avatar
      nickname
      id
      role {
        label
      }
    }
  }
}
`;

const updateSubscriber = `
mutation updateSubscriber($id: ID!, $input: SubscriberInput!) {
  updateSubscriber(id: $id, input: $input)
}`;

const generatePdf = `
mutation generatePdf($html: String!) {
  generatePdf(html: $html)
}
`;

const requestPasswordReset = `
mutation requestPasswordReset($email: String!) {
  requestPasswordReset(email: $email)
}
`;

const resetPassword = `
mutation resetPassword($resetToken: String!, $password: String!) {
  resetPassword(resetToken: $resetToken, password: $password) {
    success
    errors {
      code
      message
    }
  }
}
`;

const requestLivePrayer = `
mutation requestLivePrayer($requesterPubnubToken: String!, $requesterNickname: String!) {
  requestLivePrayer(requesterPubnubToken: $requesterPubnubToken, requesterNickname: $requesterNickname) {
    id
    name
    direct
    type
    subscribers {
      avatar
      nickname
      id
      role {
        label
      }
    }
  }
}
`;

const deleteSelf = `
mutation deleteSelf {
  deleteSelf
}
`;

const currentState = `
query CurrentState($needLanguages: Boolean!, $limit: Int) {
  ${currentEvent}
  ${currentSubscriber}
  ${currentOrganization}
  ${pubnubKeys}
  ${currentLanguages}
  ${schedule}
}`;

const client = () => new GraphQLClient(`${GATEWAY_HOST}/graphql`, {
  headers: {
    'Application-Domain': hostname(),
    'apollographql-client-name': 'chop-web-client',
    Authorization: `Bearer ${Cookie.get('access_token')}`,
    Refresh: `Bearer ${Cookie.get('refresh_token')}`,
  },
  credentials: 'include',
});

const queries = {
  currentState: async (
    needLanguages: boolean = true,
  ): Promise<GraphQLCurrentStateType> =>
    await client().request(currentState, {
      needLanguages,
      limit: 10,
    }),

  acceptPrayer: async (
    channelToken: string,
    requesterPubnubToken: string,
    requesterNickname: string
  ): Promise<GraphQLAcceptPrayer> =>
    await client().request(acceptPrayer, {
      channelToken,
      requesterPubnubToken,
      requesterNickname,
    }),

  muteSubscriber: async (channelToken: string, nickname: string): Promise<GraphQLMuteSubscriberType> =>
    await client().request(muteSubscriber, {
      channelToken,
      nickname,
    }),

  updateSubscriber: async (id: string, input: SubscriberInputType) =>
    await client().request(
      updateSubscriber,
      {
        id,
        input,
      }
    ),

  directChat: async (pubnubToken: string, nickname: string): Promise<GraphQLDirectChatType> =>
    await client().request(createDirectChannel, {
      pubnubToken,
      nickname,
    }),

  leaveChannel: async (channelToken: string): Promise<GraphQLLeaveChannelType> =>
    await client().request(leaveChannel, {
      channelToken,
    }),

  schedule: async (): Promise<GraphQLSchedule> =>
    await client().request(scheduleQuery, {
      limit: 10,
    }),

  eventAtTime: async (time: number): Promise<GraphQLEventAtTimeType> =>
    await client().request(eventAt, {
      time,
    }),

  sequence: async (time: number): Promise<GraphQLSequenceType> =>
    await client().request(sequence, {
      time,
    }),

  joinChannel: async (channelToken: string, requesterPubnubToken: string, requesterNickname: string) =>
    await client().request(
      joinChannel,
      {
        channelToken,
        requesterPubnubToken,
        requesterNickname,
      }
    ),

  generatePdf: async (html: string) =>
    await client().request(
      generatePdf,
      {
        html,
      }
    ),

  requestPasswordReset: async (email: string) =>
    await client().request(
      requestPasswordReset,
      {
        email,
      }
    ),

  resetPassword: async (resetToken: string, password: string) =>
    await client().request(
      resetPassword,
      {
        resetToken,
        password,
      }
    ),

  requestLivePrayer: async (requesterPubnubToken: string, requesterNickname: string) =>
    await client().request(
      requestLivePrayer,
      {
        requesterPubnubToken,
        requesterNickname,
      }
    ),

  deleteSelf: async () =>
    await client().request(deleteSelf),
};

export default queries;
