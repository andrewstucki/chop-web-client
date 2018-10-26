import graphqlJs from 'graphql.js';

const accessToken = `
mutation AccessToken($token: String!) {
  authenticate(type: "LegacyAuth", legacy_token: $token) {
    access_token
  }
}
`;

const currentEvent = `
currentEvent {
  title
  id
  startTime
  sequence {
    serverTime
    steps {
      timestamp
      data
    }
  }
}`;

const currentVideo = `
currentVideo {
  type
  url
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

const currentChannels = `
currentFeeds {
  id
  name
  type
  subscribers {
    pubnubToken
    avatar
    nickname
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

const currentState = `
{
  ${currentEvent}
  ${currentVideo}
  ${currentUser}
  ${currentChannels}
  ${currentOrganization}
  ${pubnubKeys}
  ${currentLanguages}
}`;

export default class GraphQl {
  request: (query: string, variables: any) => Promise<any>

  authenticate (token: string, hostname: string): Promise<void> {
    return new Promise(resolve => {
      const auth = graphqlJs('https://chopapi.com/graphql', {
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
          this.request = graphqlJs('https://chopapi.com/graphql', {
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
}
