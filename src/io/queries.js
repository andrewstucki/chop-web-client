// @flow
import { GraphQLClient } from 'graphql-request';
import { hostname } from './location';

declare var GATEWAY_HOST:string;

type AuthenticateType = {
  type: 'LegacyAuth' | 'BasicAuth' | 'Refresh',
  legacyToken?: string,
  refreshToken?: string,
  email?: string,
  password?: string
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
    subscribers {
      pubnubToken
      avatar
      nickname
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
      subscribers {
        pubnubToken
        avatar
        nickname
      }
    }
  }
}`;

const currentUser = `
currentUser {
  id
  nickname
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
currentLanguages {
  name
  code
}`;

const acceptPrayer = `
mutation AcceptPrayer($feedToken: String!, $requesterPubnubToken: String!, $hostTokens: [String!]!, $requesterNickname: String!) {
  acceptPrayer(feedToken: $feedToken, requesterPubnubToken: $requesterPubnubToken, hostTokens: $hostTokens, requesterNickname: $requesterNickname) {
    id
    name
    direct
    subscribers {
      pubnubToken
      avatar
      nickname
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
    subscribers {
      pubnubToken
      avatar
      nickname
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
query CurrentState {
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

  currentState: async (): Promise<any> => await client.request(currentState),

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
