// @Flow
/* global IntervalID */
import {
  addChannel,
  setSchedule,
  removeAuthentication,
  setScheduleData, QUERY_CURRENT_EVENT,
} from '../feed/dux';
import { setVideo } from '../videoFeed/dux';
import { addError } from '../errors/dux';
import {
  convertSubscribersToSharedUsers,
  isEmpty,
} from '../util';
import graph, { GraphQl } from './queries';
import { setPrimaryPane } from '../pane/dux';
import { EVENT } from '../pane/content/event/dux';

class ServiceActor {
  storeDispatch: (action: any) => void;
  graph: GraphQl;
  getStore: () => any;
  timer: IntervalID;

  constructor (dispatch: (action: any) => void, getStore: () => any ) {
    this.storeDispatch = dispatch;
    this.getStore = getStore;
    this.graph = graph;
  }

  setCurrentState = async () =>
    new Promise((resolve, reject) => {
      this.graph.currentState().then(data => {
        this.getInitialData(data);
        resolve(data);
      }).catch(error => {
        reject(error);
      });
    });

  handleDataFetchErrors = (payload: any) => {
    const { errors } = payload.response;
    if (errors) {
      // eslint-disable-next-line no-console
      console.log('The graphql response returned errors:');
      for (const err in errors) {
        const { message, extensions, path } = errors[err];

        if (message) {
          this.storeDispatch(addError(message));
          // eslint-disable-next-line no-console
          console.log(` - ${message}`);
        }
        if (
          extensions && extensions.code === 'UNAUTHORIZED' ||
          extensions && extensions.code === 'INTERNAL_SERVER_ERROR' && path === 'authenticate'
        ) {
          this.storeDispatch(removeAuthentication());
          return;
        }
      }
    } else {
      // eslint-disable-next-line no-console
      console.log('The graphql response returned' +
        'an error code but no error messages.');
    }
  };

  startTimer = () => {
    if (!this.timer) {
      this.timer = setInterval(this.checkTime, 1000);
    }
  };

  checkTime = async () => {
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
  };

  getInitialData = (payload: any) => {
    if (payload === undefined || payload === null) {
      return;
    }
    if (payload.eventAt || payload.currentEvent || payload.schedule) {
      this.handleEvent(payload);
    }
  };

  handleEvent = payload => {
    if (payload.event) {
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
  };

  dispatch = (action: any) => {
    if (action && action.type === QUERY_CURRENT_EVENT) {
      this.setCurrentState();
    } else if (action && action.type === 'SET_SEQUENCE') {
      this.startTimer();
    }
  }
}

export default ServiceActor;
