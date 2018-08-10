// @flow
import graphqlJs from 'graphql.js';

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
      .then(data => {
        this.storeDispatch({
          type: 'SET_INIT_DATA',
          data: data.data,
        });
      });
  }

  dispatch (action: any) {
    if (!action && !action.type) {
      return;
    }
    switch (action.type) {
    case 'GET_INIT_DATA':
      this.getInitialData();
      return;
    default:
      return;
    }
  }
}

export default GraphQlActor;