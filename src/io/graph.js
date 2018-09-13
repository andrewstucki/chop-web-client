// @flow
import graphqlJs from 'graphql.js';
import { GET_INIT_DATA, setInitData } from '../feed/dux';

class GraphQlActor {
  storeDispatch: (action: any) => void
  graph: (query: string) => any
  getAll: any
  getStore: () => any

  constructor (dispatch: (action: any) => void, getStore: () => any ) {
    this.storeDispatch = dispatch;
    this.getStore = getStore;
    this.graph = graphqlJs('https://chopapi.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + this.getStore().authToken,
      },
    });
    // this.getAll = this.graph(
    //   `{
    //     currentEvent {
    //       title
    //       eventTimeId
    //       eventStartTime
    //       eventTimezone
    //       video {
    //         type
    //         url
    //       }
    //     }
    //     currentUser {
    //       id
    //       nickname
    //       avatar
    //       role {
    //         label
    //       }
    //     }
    //     currentOrganization {
    //       id
    //       name
    //     }
    //     currentFeeds {
    //       id
    //       name
    //     }
    //     pubnubKeysForUser {
    //       pubnubAccessKey
    //       pubnubToken
    //     }
    //     pubnubKeys {
    //       publishKey
    //       subscribeKey
    //     }
    //     currentLanguages {
    //       name
    //       code
    //     }
    //   }`);
    this.getAll = () => Promise.resolve(
      {
        currentEvent: {
          title: 'Fake Event',
          eventTimeId: '12345',
          eventStartTime: Date.now(),
          eventTimezone: '-800',
          video: {
            type: '',
            url: '',
          },
        },
        currentUser: {
          id: '123456',
          nickname: 'Bon Jovi',
          avatar: null,
          role: {
            label: 'host',
          },
        },
        currentOrganization: {
          id: '2',
          name: 'Life.Church',
        },
        currentFeeds: [
          {
            id: 'public',
            name: 'public',
          },
          {
            id: 'host',
            name: 'host',
          },
        ],
        pubnubKeysForUser: {
          pubnubAccessKey: '',
          pubnubToken: '',
        },
        pubnubKeys: {
          publishKey: 'pub-c-033506b6-0428-41a0-b504-4cb35142f099',
          subscribeKey: 'sub-c-c19a0408-9f45-11e8-944c-22e677923cb5',
        },
        currentLanguages: [
          {
            name: 'English',
            code: 'en',
          },
        ],
      }
    );
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
                id: payload.currentUser.id,
                name: payload.currentUser.nickname,
                avatar: payload.currentUser.avatar,
                pubnubAccessKey: payload.pubnubKeysForUser.pubnubAccessKey,
                pubnubToken: payload.pubnubKeysForUser.pubnubToken,
                role: payload.currentUser.role,
              },
              pubnubKeys: {
                publish: payload.pubnubKeys.publishKey,
                subscribe: payload.pubnubKeys.subscribeKey,
              },
              currentChannel: payload.currentFeeds
                .find(channel => channel.name === 'public').id,
              languageOptions: payload.currentLanguages,
            }
          )
        );
      }).catch(e => {
        console.log(e);
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