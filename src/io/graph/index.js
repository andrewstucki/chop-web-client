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
    this.graph = graphqlJs('http://localhost:3000/graphql');
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
        }
      }`);
  }

  getInitialData () {
    this.getAll()
      .then(payload => {
        this.storeDispatch(
          setInitData(
            {
              event: {
                startTime: payload.data.currentEvent.eventStartTime,
                id: payload.data.currentEvent.eventTimeId,
                timezone: payload.data.currentEvent.eventTimezone,
                title: payload.data.currentEvent.title,
              },
              video: payload.data.currentEvent.video,
              organization: payload.data.currentOrganization,
              channels: payload.data.currentFeeds,
              user: {
                id: payload.data.currentProfile.id,
                name: payload.data.currentProfile.nickname,
                avatar: payload.data.currentProfile.avatar,
                pubnubAccessKey: payload.data.currentProfile.pubnub_access_key,
                pubnubToken: payload.data.currentProfile.pubnub_token,
                role: payload.data.currentProfile.role,
              },
              pubnubKeys: {
                publish: payload.data.pubnubKeys.publish_key,
                subscribe: payload.data.pubnubKeys.subscribe_key,
              },
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