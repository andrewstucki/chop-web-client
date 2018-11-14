import graphqlJs from './graphQLlib.js';

declare var GATEWAY_HOST:string;

const accessToken = `
mutation AccessToken($token: String!) {
  authenticate(type: "LegacyAuth", legacy_token: $token) {
    access_token
  }
}
`;

const sequence = `
currentEvent {
  sequence {
    serverTime
    steps {
      fetchTime
      queries
      transitionTime
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
query EventAt($time: Timestamp, $includeFeed: Boolean, $includeVideo: Boolean) {
  eventAt {
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
    video (@include: $includeVideo) {
      type
      url
    }
    feeds (@include: $includeFeed) {
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
mutation AcceptPrayer($feedToken: String!, $requesterPubnubToken: String!) {
  acceptPrayer(feedToken: $feedToken, requesterPubnubToken: $requesterPubnubToken) {
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
mutation createDirectFeed($pubnubToken: String!) {
  createDirectFeed(targetPubnubToken: $pubnubToken) {
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
  request: (query: string, variables: any) => Promise<any>

  authenticate (token: string, hostname: string): Promise<void> {
    return new Promise(resolve => {
      const auth = graphqlJs(GATEWAY_HOST, {
        method: 'POST',
        headers: {
          'Application-Domain': hostname,
        },
      });
      auth(
        accessToken,
        {
          token,
        }
      )
        .then(payload => {
          this.request = graphqlJs(GATEWAY_HOST, {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + payload.authenticate.access_token,
              'Application-Domain': hostname,
            },
          });
          resolve();
        });
    });
  }

  currentState (): Promise<any> {
    return this.request.run(currentState);
  }

  acceptPrayer (channelId: string, requesterPubnubToken: string): Promise<any> {
    return this.request(
      acceptPrayer,
      {
        feedToken: channelId,
        requesterPubnubToken,
      }
    );
  }

  muteUser (pubnubToken: string) {
    return this.request(
      muteUser,
      {
        pubnubToken,
      }
    );
  }

  directChat (pubnubToken: string) {
    return this.request(
      createDirectFeed,
      {
        pubnubToken,
      }
    );
  }

  leaveChannel (channelId: string) {
    return this.request(
      leaveChannel,
      {
        feedToken: channelId,
      }
    );
  }

  schedule () {
    return this.request.run(schedule);
  }

  eventAtTime (time, includeFeed, includeVideo) {
    return this.request(
      eventAt,
      {
        time,
        includeFeed,
        includeVideo,
      }
    );
  }

  sequence () {
    return this.request(sequence);
  }
}
