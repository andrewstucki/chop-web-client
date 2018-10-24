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
    type
    direct
    subscribers {
      pubnubAccessKey
      pubnubToken
      avatar
      userId
    }
  }
}
`;

const muteUser = ` 
mutation muteUser($pubnubToken: String!) {
  muteUser(pubnub_token: $pubnubToken) {
    success
  }
}
`;

const leaveChannel = `
mutation leaveFeed($feedId: String!) {
  leaveFeed(feed_id: $feedId) {
    success
  }
}
`;

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

  leaveChannel (channelId: string) {
    return this.request(
      leaveChannel,
      {
        feedId: channelId,
      }
    );
  }
}
