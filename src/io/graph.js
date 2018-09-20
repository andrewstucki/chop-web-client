// @flow
import graphqlJs from 'graphql.js';
import { GET_INIT_DATA, setInitData } from '../feed/dux';

class GraphQlActor {
  storeDispatch: (action: any) => void
  graph: (query: string, options?: any) => any
  getAll: any
  graphAuth: any
  getStore: () => any
  getAuthentication: (variables: any) => any

  constructor (dispatch: (action: any) => void, getStore: () => any ) {
    this.storeDispatch = dispatch;
    this.getStore = getStore;
    this.graphAuth = graphqlJs('https://chopapi.com/graphql');
    
    this.getAuthentication = this.graphAuth(
      `
mutation AccessToken($token: String!) {
  authenticate(type: "LegacyAuth", legacy_token: $token) {
    access_token
  }
}
`);
  }

  getAccessToken () {
    const token = global.document.cookie.replace(/(?:(?:^|.*;\s*)legacy_token\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.getAuthentication(
      {
        token,
      }
    ).then(payload => {
      this.graph = graphqlJs('https://chopapi.com/graphql', {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + payload.authenticate.access_token,
        },
      });
      this.graph(
        `{
  currentEvent {
    title
    eventTimeId
    eventStartTime
    eventTimezone
    video {
      type
      url
    }
  }
  currentUser {
    id
    nickname
    avatar
    role {
      label
    }
  }
  currentFeeds {
    id
    name
    type
  }
  currentOrganization {
    id
    name
  }
  pubnubKeys {
    publishKey
    subscribeKey
  }
  currentLanguages {
    name
    code
  }
}`)().then(this.getInitialData.bind(this));
    });
  }

  getInitialData (payload: any) {
    const channels = {};
    if (payload.currentFeeds) {
      payload.currentFeeds.forEach(channel => {
        channels[channel.id] = {
          id: channel.id,
          name: channel.name,
          moments: [],
        };
      });
    }
    this.storeDispatch(
      setInitData(
        {
          event: {
            startTime: payload.currentEvent.eventStartTime,
            id: payload.currentEvent.eventTimeId,
            timezone: payload.currentEvent.eventTimezone,
            title: payload.currentEvent.title,
          },
          video: payload.currentEvent.video,
          organization: payload.currentOrganization,
          channels,
          user: {
            id: payload.currentUser.id,
            name: payload.currentUser.nickname,
            avatar: payload.currentUser.avatar,
            pubnubAccessKey: payload.currentUser.pubnubAccessKey,
            pubnubToken: payload.currentUser.pubnubToken,
            role: payload.currentUser.role || { label: 'host', permissions: [] },
          },
          pubnubKeys: {
            publish: payload.pubnubKeys.publishKey,
            subscribe: payload.pubnubKeys.subscribeKey,
          },
          currentChannel: payload.currentFeeds
            .find(channel => channel.name === 'Public').id,
          languageOptions: payload.currentLanguages,
        }
      )
    );
  }

  dispatch (action: any) {
    if (!action && !action.type) {
      return;
    }
    switch (action.type) {
    case 'GET_ACCESS_TOKEN':
      this.getAccessToken();
      return;
    case GET_INIT_DATA:
      this.getInitialData();
      return;
    default:
      return;
    }
  }
}

export default GraphQlActor;