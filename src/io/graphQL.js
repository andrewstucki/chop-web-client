import { GraphQLClient } from 'graphql-request';

declare var GATEWAY_HOST:string;

type AuthenticateType = {
  type: 'LegacyAuth' | 'BasicAuth' | 'Refresh',
  hostname: string,
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
  title
  id
  startTime
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
    subscribers {
      pubnubToken
      avatar
      nickname
    }
  }
}`;

const eventAt = `
query EventAt($time: Timestamp, $includeFeed: Boolean!, $includeVideo: Boolean!) {
  eventAt (time: $time){
    title
    id
    startTime
    video @include(if: $includeVideo) {
      type
      url
    }
    feeds @include(if: $includeFeed) {
      id
      name
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
    subscribers {
      pubnubToken
      avatar
      nickname
    }
  }
}
`;

const muteUser = ` 
mutation muteUser($pubnubToken: String!) {
  muteUser(pubnubToken: $pubnubToken)
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
}`;

const currentState = `
{
  ${currentEvent}
  ${currentUser}
  ${currentOrganization}
  ${pubnubKeys}
  ${currentLanguages}
  ${schedule}
}`;

export default class GraphQl {
  client: GraphQLClient

  async authenticate ({type, hostname, legacyToken, refreshToken, email, password}:AuthenticateType): Promise<void> {
    const client = new GraphQLClient(GATEWAY_HOST, {
      headers: {
        'Application-Domain': hostname,
      },
    });

    const data = await client.request(accessToken, {
      type,
      legacyToken,
      refreshToken,
      email,
      password,
    });

    this.setClient(data.authenticate.accessToken, hostname);

    return data;
  }

  setClient (accessToken:string, hostname:string) {
    this.client = new GraphQLClient(GATEWAY_HOST, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Application-Domain': hostname,
      },
    });
  }

  async authenticateByLegacyToken (legacyToken: string, hostname: string): Promise<void> {
    return await this.authenticate({
      type: 'LegacyAuth',
      hostname,
      legacyToken,
    });
  }

  async authenticateByBasicAuth (email: string, password: string, hostname: string): Promise<void> {
    return await this.authenticate({
      type: 'BasicAuth',
      hostname,
      email,
      password,
    });
  }

  async authenticateByRefreshToken (refreshToken: string, hostname: string): Promise<void> {
    return await this.authenticate({
      type: 'Refresh',
      hostname,
      refreshToken,
    });
  }

  async currentState (): Promise<any> {
    return await this.client.request(currentState);
  }

  async acceptPrayer (channelId: string, requesterPubnubToken: string, hostTokens: Array<string>, requesterName: string): Promise<any> {
    return await this.client.request(
      acceptPrayer,
      {
        feedToken: channelId,
        requesterPubnubToken,
        hostTokens,
        requesterNickname: requesterName,
      }
    );
  }

  async muteUser (pubnubToken: string) {
    return await this.client.request(
      muteUser,
      {
        pubnubToken,
      }
    );
  }

  async directChat (pubnubToken: string, nickname: string) {
    return await this.client.request(
      createDirectFeed,
      {
        pubnubToken,
        nickname,
      }
    );
  }

  async leaveChannel (channelId: string) {
    return await this.client.request(
      leaveChannel,
      {
        feedToken: channelId,
      }
    );
  }

  async schedule () {
    return await this.client.request(schedule);
  }

  async eventAtTime (time, includeFeed, includeVideo) {
    return await this.client.request(
      eventAt,
      {
        time,
        includeFeed,
        includeVideo,
      }
    );
  }

  async sequence (time) {
    return await this.client.request(
      sequence,
      {
        time,
      }
    );
  }
}
