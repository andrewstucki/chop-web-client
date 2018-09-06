// @flow
import graphqlJs from 'graphql.js';
import { GET_INIT_DATA, setInitData } from '../../feed/dux';

class GraphQlActor {
  storeDispatch: (action: any) => void
  graph: (query: string) => any
  getAll: any
  getStore: () => any

  constructor (dispatch: (action: any) => void, getStore: () => any ) {
    this.storeDispatch = dispatch;
    this.getStore = getStore;
    this.graph = graphqlJs('https://chopapi.com/graphql');
    this.getAll = this.graph(
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
        currentProfile {
          id
          nickname
          avatar
          pubnub_token
          pubnub_access_key
          role {
            label
            permissions
          }
        }
        currentOrganization {
          id
          name
        }
        currentFeeds {
          id
          name
          direct
          users {
            id
            nickname
            avatar
          }
        }
        pubnubKeys {
          publish_key
          subscribe_key
        },
        currentLanguages {
          name
          code
        }
      }`);
  }

  getInitialData () {
    this.getAll()
      .then(payload => {
        const channels = {};
        payload.currentFeeds.forEach(channel => {
          channels[channel.id] = {
            id: channel.id,
            name: channel.name,
            moments: [],
          };
        });
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
                id: payload.currentProfile.id,
                name: payload.currentProfile.nickname,
                avatar: payload.currentProfile.avatar,
                pubnubAccessKey: payload.currentProfile.pubnub_access_key,
                pubnubToken: payload.currentProfile.pubnub_token,
                role: payload.currentProfile.role,
              },
              pubnubKeys: {
                publish: payload.pubnubKeys.publish_key,
                subscribe: payload.pubnubKeys.subscribe_key,
              },
              currentChannel: payload.currentFeeds
                .find(channel => channel.name === 'public').id,
              languageOptions: payload.currentLanguages,
            }
          )
        );
      });
  }

  dispatch (action: any) {
    if (!action && !action.type) {
      return;
    }
    switch (action.type) {
    case GET_INIT_DATA:
      this.getInitialData();
      return;
    default:
      return;
    }
  }
}

export default GraphQlActor;