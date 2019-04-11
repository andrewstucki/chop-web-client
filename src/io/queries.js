// @flow
import { GraphQLClient } from 'graphql-request';
import { hostname } from './location';
import type { VideoTypeType } from '../videoFeed/dux';
import type {URLType} from '../cwc-types';

declare var GATEWAY_HOST:string;

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
  password?: string
}

export type GraphQLOrganizationType = {|
  id: number,
  name: GraphQLString,
|};

export type GraphQLParticipantsType = {|
  id: GraphQLInt,
  pubnubToken: GraphQLString,
  avatar: GraphQLString,
  name: GraphQLString,
|};

export type GraphQLChannelType = {|
  id: string,
  name: GraphQLString,
  type: GraphQLString,
  direct: GraphQLBoolean,
  participants: Array<GraphQLParticipantsType>,
|};

export type GraphQLEventTimeType = {|
  id: GraphQLID,
|};

export type GraphQLVideoType = {|
  type: VideoTypeType,
  url: URLType,
|};

export type GraphQLSequenceStepType = {|
  fetchTime: number,
  queries: Array<string>,
  transitionTime: number,
|};

export type GraphQLSequenceType = {|
  serverTime: number,
  steps: Array<GraphQLSequenceStepType>,
|};

export type GraphQLLanguageType = {|
  name: string,
  code: string,
|};

export type GraphQLPermission = {|
  key: string,
|};

export type GraphQlRole = {|
  label: string,
  permissions: Array<GraphQLPermission>,
|};

export type GraphQLUserType = {|
  avatar: GraphQLString,
  id: number,
  name: GraphQLString,
  pubnubAccessKey: GraphQLString,
  pubnubToken: GraphQLString,
  role: GraphQlRole,
|};

export type GraphQLPubnubKeys = {|
  publishKey: string,
  subscribeKey: string,
|};

export type GraphQLCurrentEventType = {|
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
|};

export type GraphQLSchedule = {|
  id: string,
  startTime: GraphQLInt,
  endTime: GraphQLInt,
  title: GraphQLString,
  fetchTime: GraphQLInt,
  scheduleTime: GraphQLInt,
  hostInfo: GraphQLString,
|};

export type GraphQLCurrentStateType = {|
  currentEvent: GraphQLCurrentEventType,
  currentOrganization: GraphQLOrganizationType,
  currentLanguages: Array<GraphQLLanguageType>,
  currentUser: GraphQLUserType,
  pubnubKeys: GraphQLPubnubKeys,
  schedule: Array<GraphQLSchedule>,
|};

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
}`;

const currentOrganization = `
currentOrganization {
  id
  name
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
mutation AcceptPrayer($feedToken: String!, $requesterPubnubToken: String!, $hostTokens: [String!]!, $requesterNickname: String!) {
  acceptPrayer(feedToken: $feedToken, requesterPubnubToken: $requesterPubnubToken, hostTokens: $hostTokens, requesterNickname: $requesterNickname) {
    id
    name
    direct
    participants: subscribers {
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
    direct
    participants: subscribers {
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

  authenticate: async ({type, legacyToken, refreshToken, email, password}:AuthenticateType): Promise<void> => {
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

  authenticateByLegacyToken: async (legacyToken: string): Promise<void> =>
    await queries.authenticate({
      type: 'LegacyAuth',
      legacyToken,
    }),

  authenticateByBasicAuth: async (email: string, password: string): Promise<void> =>
    await queries.authenticate({
      type: 'BasicAuth',
      email,
      password,
    }),

  authenticateByRefreshToken: async (refreshToken: string): Promise<void> =>
    await queries.authenticate({
      type: 'Refresh',
      refreshToken,
    }),

  currentState: async (needLanguages: boolean = true): Promise<GraphQLCurrentStateType> =>
    await client.request(
      currentState,
      {
        needLanguages,
      }
    ),

  acceptPrayer: async (channelId: string, requesterPubnubToken: string, hostTokens: Array<string>, requesterName: string): Promise<any> =>
    await client.request(
      acceptPrayer,
      {
        feedToken: channelId,
        requesterPubnubToken,
        hostTokens,
        requesterNickname: requesterName,
      }
    ),

  muteUser: async (feedToken: string, nickname: string) =>
    await client.request(
      muteUser,
      {
        feedToken,
        nickname,
      }
    ),

  directChat: async (pubnubToken: string, nickname: string) =>
    await client.request(
      createDirectFeed,
      {
        pubnubToken,
        nickname,
      }
    ),

  leaveChannel: async (channelId: string) =>
    await client.request(
      leaveChannel,
      {
        feedToken: channelId,
      }
    ),

  schedule: async () => await client.request(schedule),

  eventAtTime: async (time: number) =>
    await client.request(
      eventAt,
      {
        time,
      }
    ),

  sequence: async (time: number) =>
    await client.request(
      sequence,
      {
        time,
      }
    ),
};

export default queries;

export {
  setAccessToken,
};
