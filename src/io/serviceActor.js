// @Flow
/* global IntervalID */
import {
  removeAuthentication,
  setScheduleData,
} from '../feed/dux';
import { addError } from '../errors/dux';
import graph, { GraphQl } from './queries';

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

  dispatch = (action: any) => {
    if (action && action.type === 'SET_SEQUENCE') {
      this.startTimer();
    }
  }
}

export default ServiceActor;
