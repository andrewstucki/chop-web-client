// @flow
import { GraphQLClient } from 'graphql-request';
import { hostname } from './location';
import type { VideoTypeType } from '../videoFeed/dux';
import type { URLType } from '../cwc-types';
import type { SubscriberInputType } from '../subscriber/dux';

declare var GATEWAY_HOST: string;

// By default GraphQL types are Nullable
type GraphQLString = string | null;
type GraphQLID = string | null;
type GraphQLInt = number | null;
type GraphQLBoolean = boolean | null;

type AuthenticateType = {
  type: 'LegacyAuth' | 'BasicAuth' | 'Refresh',
  legacyToken?: string,
  refreshToken?: string,
  email?: string,
  password?: string,
};

export type GraphQLAuthType = {
  authenticate: {
    accessToken: GraphQLString,
    refreshToken: GraphQLString,
  }
}

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

const accessToken = `
mutation AccessToken($type: String!, $email: String, $password: String, $legacyToken: String, $refreshToken: String) {
  authenticate(type: $type, email: $email, password: $password, legacyToken: $legacyToken, refreshToken: $refreshToken) {
    accessToken
    refreshToken
  }
}
`;

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
currentSubscriber: currentSubscriber {
  userId
  id
  nickname
  avatar
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
mutation joinFeed($channel: String!, $requesterId: ID!, $requesterNickname: String!) {
  joinFeed(feedToken: $channel, requesterId: $requesterId, requesterNickname: $requesterNickname) {
    id
    name
    direct
    type
    subscribers {
      avatar
      nickname
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

const currentState = `
query CurrentState($needLanguages: Boolean!, $limit: Int) {
  ${currentEvent}
  ${currentSubscriber}
  ${currentOrganization}
  ${pubnubKeys}
  ${currentLanguages}
  ${schedule}
}`;

let client = new GraphQLClient(GATEWAY_HOST, {
  headers: {
    'Application-Domain': hostname(),
  },
});

const setAccessToken = (accessToken: string): void => {
  client = new GraphQLClient(GATEWAY_HOST, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Application-Domain': hostname(),
    },
  });
};

const queries = {
  authenticate: async ({
    type,
    legacyToken,
    refreshToken,
    email,
    password,
  }: AuthenticateType): Promise<void> => {
    const data = await client.request(accessToken, {
      type,
      legacyToken,
      refreshToken,
      email,
      password,
    });

    setAccessToken(data.authenticate.accessToken);

    return data;
  },

  authenticateByLegacyToken: async (legacyToken: string): Promise<GraphQLAuthType> =>
    await queries.authenticate({
      type: 'LegacyAuth',
      legacyToken,
    }),

  authenticateByBasicAuth: async (
    email: string,
    password: string
  ): Promise<void> =>
    await queries.authenticate({
      type: 'BasicAuth',
      email,
      password,
    }),

  authenticateByRefreshToken: async (refreshToken: string): Promise<GraphQLAuthType> =>
    await queries.authenticate({
      type: 'Refresh',
      refreshToken,
    }),

  currentState: async (
    needLanguages: boolean = true,
  ): Promise<GraphQLCurrentStateType> =>
    await client.request(currentState, {
      needLanguages,
      limit: 10,
    }),

  acceptPrayer: async (
    channelToken: string,
    requesterPubnubToken: string,
    requesterNickname: string
  ): Promise<GraphQLAcceptPrayer> =>
    await client.request(acceptPrayer, {
      channelToken,
      requesterPubnubToken,
      requesterNickname,
    }),

  muteSubscriber: async (channelToken: string, nickname: string): Promise<GraphQLMuteSubscriberType> =>
    await client.request(muteSubscriber, {
      channelToken,
      nickname,
    }),

  updateSubscriber: async (id: string, input: SubscriberInputType) =>
    await client.request(
      updateSubscriber,
      {
        id,
        input,
      }
    ),

  directChat: async (pubnubToken: string, nickname: string): Promise<GraphQLDirectChatType> =>
    await client.request(createDirectChannel, {
      pubnubToken,
      nickname,
    }),

  leaveChannel: async (channelToken: string): Promise<GraphQLLeaveChannelType> =>
    await client.request(leaveChannel, {
      channelToken,
    }),

  schedule: async (): Promise<GraphQLSchedule> =>
    await client.request(scheduleQuery, {
      limit: 10,
    }),

  eventAtTime: async (time: number): Promise<GraphQLEventAtTimeType> =>
    await client.request(eventAt, {
      time,
    }),

  sequence: async (time: number): Promise<GraphQLSequenceType> =>
    await client.request(sequence, {
      time,
    }),

  joinChannel: async (channel: string, requesterId: string, requesterNickname: string) =>
    await client.request(
      joinChannel,
      {
        channel,
        requesterId,
        requesterNickname,
      }
    ),

  generatePdf: async (html: string) =>
    await client.request(
      generatePdf,
      {
        html,
      }
    ),
};

export default queries;

export { setAccessToken };
