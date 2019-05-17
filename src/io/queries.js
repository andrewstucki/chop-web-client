// @flow
import { GraphQLClient } from 'graphql-request';
import { hostname } from './location';
import type { VideoTypeType } from '../videoFeed/dux';
import type { URLType } from '../cwc-types';
import type { UserInputType } from '../users/dux';

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

export type GraphQLOrganizationType = {
  currentOrganization: {
    id: number,
    name: GraphQLString,
    logoUrl:GraphQLString,
  }
};

export type GraphQLParticipantsType = {
  id: GraphQLInt,
  pubnubToken: GraphQLString,
  avatar: GraphQLString,
  name: GraphQLString,
};

export type GraphQLChannelType = {
  id: string,
  name: GraphQLString,
  type: GraphQLString,
  direct: GraphQLBoolean,
  participants: Array<GraphQLParticipantsType>,
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

export type GraphQLUserType = {
  currentUser: {
    avatar: GraphQLString,
    id: number,
    name: GraphQLString,
    pubnubAccessKey: GraphQLString,
    pubnubToken: GraphQLString,
    role: GraphQlRole,
    preferences: GraphQlPreferences,
  }
};

export type GraphQLPubnubKeys = {
  pubnubKeys: {
    publishKey: string,
    subscribeKey: string,
  }
};

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
  feeds: Array<GraphQLChannelType>,
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
  feeds: Array<GraphQLChannelType>,
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
  GraphQLUserType &
  GraphQLPubnubKeys & GraphQLSchedule;

export type GraphQLAcceptPrayer = {
  acceptPrayer: boolean,
}

export type GraphQLMuteUserType = {
  muteUser: boolean,
}

export type GraphQLLeaveChannelType = {
  leaveChannel: boolean,
}

export type GraphQLDirectChatType = {
  createDirectFeed: GraphQLChannelType,
}

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
  feeds {
    id
    name
    type
    direct
    participants: subscribers {
      id: userId
      pubnubToken
      avatar
      name: nickname
    }
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
    feeds {
      id
      name
      direct
      type
      participants: subscribers {
        id: userId
        pubnubToken
        avatar
        name: nickname
      }
    }
  }
}`;

const currentUser = `
currentUser {
  id
  name: nickname
  avatar
  pubnubToken
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
mutation AcceptPrayer($feedToken: String!, $requesterPubnubToken: String!, $requesterNickname: String!) {
  acceptPrayer(feedToken: $feedToken, requesterPubnubToken: $requesterPubnubToken, requesterNickname: $requesterNickname) {
    id
    name
    type
    direct
    participants: subscribers {
      id: userId
      pubnubToken
      avatar
      name: nickname
    }
  }
}
`;

const muteUser = ` 
mutation muteUser($feedToken: String!, $nickname: String!) {
  muteUser(feedToken: $feedToken, nickname: $nickname, clientIp: "0.0.0.0")
}
`;

const leaveChannel = `
mutation leaveFeed($feedToken: String!) {
  leaveFeed(feedToken: $feedToken)
}
`;

const createDirectFeed = `
mutation createDirectFeed($pubnubToken: String!, $nickname: String!) {
  createDirectFeed(targetPubnubToken: $pubnubToken, targetNickname: $nickname) {
    id
    name
    type
    direct
    participants: subscribers {
      id: userId
      pubnubToken
      avatar
      name: nickname
    }
  }
}`;

const schedule = `
schedule {
  fetchTime
  startTime
  endTime
  id
  title
  scheduleTime
  hostInfo
}`;

const joinChannel = `
mutation joinFeed($channel: String!, $requesterPubnubToken: String!, $requesterNickname: String!) {
  joinFeed(feedToken: $channel, requesterPubnubToken: $requesterPubnubToken, requesterNickname: $requesterNickname) {
    id
    name
    direct
    type
    participants: subscribers {
      pubnubToken
      avatar
      name: nickname
    }
  }
}
`;

const updateUser = `
mutation updateUser($id: ID!, $input: UserInput!) {
  updateUser(id: $id, input: $input) {
    id
    name: nickname
    avatar
    pubnubToken
    role {
      label
      permissions {
        key
      }
    }
    preferences {
      textMode
    }
  }
}
`;

const currentState = `
query CurrentState($needLanguages: Boolean!) {
  ${currentEvent}
  ${currentUser}
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
    needLanguages: boolean = true
  ): Promise<GraphQLCurrentStateType> =>
    await client.request(currentState, {
      needLanguages,
    }),

  acceptPrayer: async (
    channelId: string,
    requesterPubnubToken: string,

    requesterName: string
  ): Promise<GraphQLAcceptPrayer> =>
    await client.request(acceptPrayer, {
      feedToken: channelId,
      requesterPubnubToken,

      requesterNickname: requesterName,
    }),

  muteUser: async (feedToken: string, nickname: string): Promise<GraphQLMuteUserType> =>
    await client.request(muteUser, {
      feedToken,
      nickname,
    }),

  updateUser: async (id: string, input: UserInputType) =>
    await client.request(
      updateUser,
      {
        id,
        input,
      }
    ),

  directChat: async (pubnubToken: string, nickname: string): Promise<GraphQLDirectChatType> =>
    await client.request(createDirectFeed, {
      pubnubToken,
      nickname,
    }),

  leaveChannel: async (channelId: string): Promise<GraphQLLeaveChannelType> =>
    await client.request(leaveChannel, {
      feedToken: channelId,
    }),

  schedule: async (): Promise<GraphQLSchedule> =>
    await client.request(schedule),

  eventAtTime: async (time: number): Promise<GraphQLEventAtTimeType> =>
    await client.request(eventAt, {
      time,
    }),

  sequence: async (time: number): Promise<GraphQLSequenceType> =>
    await client.request(sequence, {
      time,
    }),

  joinChannel: async (channel: string, requesterPubnubToken: string, requesterNickname: string) =>
    await client.request(
      joinChannel,
      {
        channel,
        requesterPubnubToken,
        requesterNickname,
      }
    ),
};

export default queries;

export { setAccessToken };
