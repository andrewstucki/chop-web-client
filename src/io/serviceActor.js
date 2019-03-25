// @Flow
/* global IntervalID */
import {
  addChannel,
  setEvent,
  setOrganization,
  setPubnubKeys,
  setUser,
  setLanguageOptions,
  setSchedule,
  setAuthentication,
  removeAuthentication,
  setScheduleData,
} from '../feed/dux';
import { REHYDRATE } from 'redux-persist/lib/constants';
import { BASIC_AUTH_LOGIN } from '../login/dux';
import type { BasicAuthLoginType } from '../login/dux';
import { setVideo } from '../videoFeed/dux';
import { addError } from '../errors/dux';
import {
  avatarImageExists,
  convertSubscribersToSharedUsers,
  isEmpty,
} from '../util';
import LegacyToken from './LegacyToken';
import graph, { setClient, GraphQl } from './queries';
import Scheduler from './scheduler';
import { setPrimaryPane } from '../pane/dux';
import { EVENT } from '../pane/content/event/dux';

class ServiceActor {
  storeDispatch: (action: any) => void;
  graph: GraphQl;
  getStore: () => any;
  legacyToken: LegacyToken;
  handleDataFetchErrors: (payload: any) => void;
  setCurrentState: (payload: any) => void;
  getInitialData: (payload: any) => void;
  scheduler: Scheduler;
  startTimer: () => void;
  checkTime: () => void;
  timer: IntervalID;

  constructor (dispatch: (action: any) => void, getStore: () => any ) {
    this.storeDispatch = dispatch;
    this.getStore = getStore;
    this.legacyToken = new LegacyToken();
    this.graph = graph;

    this.getInitialData = this._getInitialData.bind(this);
    this.handleDataFetchErrors = this._handleDataFetchErrors.bind(this);
    this.startTimer = this._startTimer.bind(this);
    this.checkTime = this._checkTime.bind(this);
    this.setCurrentState = this._setCurrentState.bind(this);
    this.handleEvent = this._handleEvent.bind(this);
  }

  async init () {
    const { accessToken, refreshToken } = this.getStore().auth;
    const legacyToken = this.legacyToken.get();

    if (accessToken) {
      await this.initWithAccessToken(accessToken, refreshToken);
    } else if (legacyToken) {
      await this.initWithLegacyToken(legacyToken);
    }
  }

  async initWithAccessToken (accessToken: string, refreshToken:string) {
    setClient(accessToken);
    this.setCurrentState().catch(error => {
      if (refreshToken) {
        this.getAccessTokenByRefreshToken(refreshToken);
      } else {
        this.storeDispatch(removeAuthentication());
        this.handleDataFetchErrors(error);
      }
    });
  }

  async initWithLegacyToken (legacyToken:string) {
    try {
      const auth = await this.graph.authenticateByLegacyToken(legacyToken);
      const { accessToken, refreshToken } = auth.authenticate;
      this.storeDispatch(setAuthentication(accessToken, refreshToken));
      this.setCurrentState();
    } catch (error) {
      this.storeDispatch(removeAuthentication());
      this.handleDataFetchErrors(error);
    }
  }

  async getAccessTokenByBasicAuth (action:BasicAuthLoginType) {
    try {
      const auth = await this.graph.authenticateByBasicAuth(action.email, action.password);
      const { accessToken, refreshToken } = auth.authenticate;
      this.storeDispatch(setAuthentication(accessToken, refreshToken));
      this.setCurrentState();
    } catch (error) {
      this.handleDataFetchErrors(error);
    }
  }

  async getAccessTokenByRefreshToken (token: string) {
    try {
      const auth = await this.graph.authenticateByRefreshToken(token);
      const { accessToken, refreshToken } = auth.authenticate;
      this.storeDispatch(setAuthentication(accessToken, refreshToken));
      this.setCurrentState();
    } catch (error) {
      this.storeDispatch(removeAuthentication());
      this.handleDataFetchErrors(error);
    }
  }

  async _setCurrentState () {
    return new Promise((resolve, reject) => {
      this.graph.currentState().then(data => {
        this.getInitialData(data);
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });
  }

  _handleDataFetchErrors (payload: any) {
    const { errors } = payload.response;
    if (errors) {
      // eslint-disable-next-line no-console
      console.log('The graphql response returned errors:');
      for (const err in errors) {
        const { message, extensions } = errors[err];

        if (message) {
          this.storeDispatch(addError(message));
          // eslint-disable-next-line no-console
          console.log(` - ${message}`);
        }
        if (extensions) {
          const { code = '' } = extensions;
          if (code) {
            switch (code) {
              case 'UNAUTHORIZED':
                this.storeDispatch(removeAuthentication());
                return;
            }
          }
        }
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('The graphql response returned' +
        'an error code but no error messages.');
    }
  }

  _startTimer () {
    if (!this.timer) {
      this.timer = setInterval(this.checkTime, 1000);
    }
  }

  async _checkTime () {
    const now = Date.now();
    const { schedule, sequence } = this.getStore();
    if (sequence && sequence.steps && sequence.steps[0]) {
      const [ step ] = sequence.steps;
      if (step.transitionTime * 1000 <= now) {
        if (step.data) {
          this.getInitialData(step.data);

          const newSteps = sequence.steps.splice(1);
          this.storeDispatch(
            {
              type: 'SET_SEQUENCE',
              sequence: {
                ...sequence,
                steps: newSteps,
              },
            }
          );
        } else {
          try {
            const eventAtTime = await this.graph.eventAtTime(step.transitionTime);
            this.getInitialData(eventAtTime);

            const newSteps = sequence.steps.splice(1);
            this.storeDispatch(
              {
                type: 'SET_SEQUENCE',
                sequence: {
                  ...sequence,
                  steps: newSteps,
                },
              }
            );
          } catch (error) {
            this.handleDataFetchErrors(error);
          }
        }
      }
      if (!step.data && step.fetchTime * 1000 <= now) {
        try {
          const eventAtTime = await this.graph.eventAtTime(step.transitionTime);
          this.storeDispatch(setScheduleData(
            step.transitionTime,
            eventAtTime
          ));
        } catch (error) {
          this.handleDataFetchErrors(error);
        }
      }
    }
    if (sequence && sequence.steps && sequence.steps.length === 0) {
      if (schedule[0] && schedule[0].startTime * 1000 < now) {
        schedule.shift();
      }
      const [ nextEvent ] = schedule;
      this.storeDispatch(setScheduleData(schedule));
      try {
        const sequenceResponse = await this.graph.sequence(nextEvent.startTime);
        this.getInitialData(sequenceResponse);
      } catch (error) {
        this.handleDataFetchErrors(error);
      }
    }
  }

  _getInitialData (payload: any) {
    if (payload === undefined || payload === null) {
      return;
    }
    const { pubnubKeys } = payload;
    if (pubnubKeys) {
      const { publishKey, subscribeKey } = pubnubKeys;
      this.storeDispatch(
        setPubnubKeys(
          publishKey,
          subscribeKey
        )
      );
    }
    const { currentUser } = payload;
    if (currentUser) {
      const user = currentUser;
      this.storeDispatch(
        setUser(
          {
            id: user.id,
            name: user.nickname,
            avatar: user.avatar,
            pubnubAccessKey: user.pubnubAccessKey,
            pubnubToken: user.pubnubToken,
            role: {
              label: user.role ? user.role.label : '',
              permissions: [],
            },
          }
        )
      );
      avatarImageExists(payload.currentUser.id).then(exists => {
        if (exists) {
          this.storeDispatch(
            {
              type: 'SET_AVATAR',
              url: `https://chop-v3-media.s3.amazonaws.com/users/avatars/${payload.currentUser.id}/thumb/photo.jpg`,
            }
          );
        }
      });
    }
    if (payload.eventAt || payload.currentEvent || payload.schedule) {
      this.handleEvent(payload);
    }
    const { currentOrganization } = payload;
    if (currentOrganization) {
      const organization = currentOrganization;
      this.storeDispatch(
        setOrganization(
          organization.id,
          organization.name,
        )
      );
    }
    const { currentLanguages } = payload;
    if (currentLanguages) {
      const languages = currentLanguages;
      this.storeDispatch(
        setLanguageOptions(languages)
      );
    }
  }

  _handleEvent (payload) {
    const event = payload.currentEvent || payload.eventAt;
    if (event) {
      if (event.title !== undefined &&
        event.id !== undefined &&
        event.eventTime !== undefined &&
        event.eventTime.id !== undefined &&
        event.startTime !== undefined &&
        event.endTime !== undefined &&
        event.videoStartTime !== undefined) {
        this.storeDispatch(
          setEvent(
            event.title,
            event.id,
            event.eventTime.id,
            event.startTime,
            event.endTime,
            event.videoStartTime,
            event.speaker || '',
            event.description || '',
            event.hostInfo || '',
          )
        );
      }

      const { sequence } = event;
      if (sequence && sequence.steps && sequence.steps.length > 0) {
        const now = Date.now();
        const updatedSequence = {
          ...sequence,
          steps: sequence.steps.filter(step =>
            step.transitionTime * 1000 > now),
        };

        this.storeDispatch(
          {
            type: 'SET_SEQUENCE',
            sequence: updatedSequence,
          }
        );

        this.startTimer();
      }
      if (event.feeds) {
        const { feeds:newChannels } = event;
        const { channels:currentChannels } = this.getStore();

        Object.keys(currentChannels).forEach(id => {
          if (!newChannels.some(channel => channel.id === id)) {
            this.storeDispatch(
              {
                type: 'REMOVE_CHANNEL',
                channel: id,
              }
            );
          }
        });

        newChannels.forEach(channel => {
          if (!(channel.id in currentChannels)) {
            const participants = convertSubscribersToSharedUsers(channel.subscribers);
            this.storeDispatch(
              addChannel(
                channel.name,
                channel.id,
                channel.direct,
                participants
              )
            );
            if (channel.name === 'Public') {
              this.storeDispatch(
                setPrimaryPane(EVENT, channel.id)
              );
            }
          }
        });

        const { video } = event;
        if (video) {
          this.storeDispatch(
            setVideo(
              video.url,
              video.type,
            )
          );
        }
      }
    }
    const { schedule } = payload;
    if (schedule) {
      const isBetweenEvents = isEmpty(event.id) && isEmpty(this.getStore().event.id);
      const updatedSchedule = schedule.filter(item =>
        item.startTime * 1000 > Date.now());

      this.storeDispatch(setSchedule(updatedSchedule));

      if (isBetweenEvents) {
        const [nextEvent] = schedule;
        if (nextEvent) {
          try {
            this.graph.sequence(nextEvent.startTime).then(this.getInitialData, this.handleDataFetchErrors);
          } catch (error) {
            this.handleDataFetchErrors(error);
          }
        }
      }
    }
  }

  dispatch (action: any) {
    if (!action && !action.type) {
      return;
    }
    switch (action.type) {
      case REHYDRATE:
        this.init();
        return;
      case BASIC_AUTH_LOGIN:
        this.getAccessTokenByBasicAuth(action);
        return;
      default:
        return;
    }
  }
}

export default ServiceActor;
