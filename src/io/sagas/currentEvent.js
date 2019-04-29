// @flow
import {call, put, select} from 'redux-saga/effects';
import type {Saga} from 'redux-saga';
import queries from '../queries';
import type { GraphQLCurrentStateType, GraphQLCurrentEventType, GraphQLChannelType } from '../queries';
import {
  setPubnubKeys,
  QUERY_CURRENT_EVENT_FAILED,
  QUERY_SCHEDULE_FAILED,
  setUser,
  setOrganization,
  setLanguageOptions,
  setEvent,
  setChannels,
  setSchedule,
} from '../../feed/dux';
import bugsnagClient from '../../util/bugsnag';
import { avatarImageExists } from '../../util';
import {getLanguageCount} from '../../selectors/languageSelector';
import {setVideo} from '../../videoFeed/dux';
import type {ChannelsObjectType} from '../../feed/dux';
import {convertUser} from './privateChat';
import {isOffline} from '../../selectors/eventSelectors';

const isTimeInFuture = (seconds: number): boolean => (seconds * 1000) > Date.now();

const convertChannel = (channels: Array<GraphQLChannelType>): ChannelsObjectType => {
  const channelsObj = {};
  channels.forEach(channel => {
    channelsObj[channel.id] = {
      ...channel,
      participants: channel.participants.map(convertUser),
      moments: [],
      anchorMoments: [],
      scrollPosition: 0,
      sawLastMomentAt: Date.now(),
      placeholder: false,
    };
  });
  return channelsObj;
};

function* currentEvent (): Saga<void> {
  const languageCount = yield select(state => getLanguageCount(state.feed));
  const needLanguages = languageCount === 0;
  try {
    const result: GraphQLCurrentStateType = yield call([queries, queries.currentState], needLanguages);
    yield* dispatchData(result);
  } catch (error) {
    yield put({type: QUERY_CURRENT_EVENT_FAILED, error: error.message});
    bugsnagClient.notify(error);
  }
}

function* dispatchData (data: GraphQLCurrentStateType): Saga<void> {
  yield* pubnubKeys(data);
  yield* currentUser(data);
  yield* organization(data);
  yield* languageOptions(data);
  yield* event(data);
  yield* schedule(data);
}

function* pubnubKeys (data: GraphQLCurrentStateType): Saga<void> {
  if (data.pubnubKeys) {
    const { pubnubKeys: { publishKey, subscribeKey } } = data;
    yield put(setPubnubKeys(publishKey, subscribeKey));
  }
}

function* currentUser (data:GraphQLCurrentStateType): Saga<void> {
  if (data.currentUser) {
    const { currentUser: { id, name, avatar, pubnubAccessKey, pubnubToken, role: { label = '', permissions = [] } } } = data;
    if (pubnubToken === null || pubnubToken === undefined || pubnubToken === '') {
      throw new Error(`User with id: ${id} does not have a pubnubToken`);
    }
    yield put(
      setUser(
        {
          id,
          name: name || '',
          avatar,
          pubnubAccessKey: pubnubAccessKey || '',
          pubnubToken,
          role: {
            label,
            permissions,
          },
        }
      )
    );
    const exists = yield call(avatarImageExists, id.toString());
    if (exists) {
      yield put(
        {
          type: 'SET_AVATAR',
          url: `https://chop-v3-media.s3.amazonaws.com/users/avatars/${id}/thumb/photo.jpg`,
        }
      );
    }
  }
}

function* organization (data: GraphQLCurrentStateType): Saga<void> {
  if (data.currentOrganization) {
    const { currentOrganization: { id, name } } = data;
    yield put(setOrganization(id, name || ''));
  }
}

function* languageOptions (data: GraphQLCurrentStateType): Saga<void> {
  if (data.currentLanguages) {
    const { currentLanguages } = data;
    yield put(setLanguageOptions(currentLanguages));
  }
}

function* event (data: GraphQLCurrentStateType): Saga<void> {
  const event: GraphQLCurrentEventType = data.currentEvent || data.eventAt;
  if (event && event.id) {
    yield* eventMain(event);
    yield* sequence(event);
    yield* channels(event);
    yield* video(event);
  }
}

function* eventMain (event: GraphQLCurrentEventType): Saga<void> {
  yield put(
    setEvent(
      event.title || '',
      event.id || '',
      event.eventTime.id || '',
      event.startTime || 0,
      event.endTime || 0,
      event.videoStartTime || 0,
      event.speaker || '',
      event.description || '',
      event.hostInfo || '',
    )
  );
}

function* sequence (event: GraphQLCurrentEventType): Saga<void> {
  const { sequence } = event;
  if (sequence?.steps?.length > 0) {
    const now = Date.now();
    const updatedSequence = {
      ...sequence,
      steps: sequence.steps.filter(step =>
        step.transitionTime * 1000 > now),
    };
    yield put(
      {
        type: 'SET_SEQUENCE',
        sequence: updatedSequence,
      }
    );
  }
}

function* channels (event: GraphQLCurrentEventType): Saga<void> {
  const { feeds: channels } = event;
  if (channels) {
    yield put(setChannels(convertChannel(channels)));
  }
}

function* video (event: GraphQLCurrentEventType): Saga<void> {
  const { video } = event;
  if (video) {
    yield put(
      setVideo(
        video.url,
        video.type,
      )
    );
  }
}

function* schedule (data: GraphQLCurrentStateType): Saga<void> {
  const { schedule } = data;
  if (schedule) {
    const isBetweenEvents = yield select(state => isOffline(state.feed));
    const futureScheduleEvents = schedule.filter(event => {
      if (event.startTime && event.endTime && event.fetchTime && event.scheduleTime) {
        return isTimeInFuture(event.startTime);
      } else {
        bugsnagClient.notify(new Error(`Scheduled event ${event.id} has either, startTime, endTime, fetchTime or scheduleTime as null`));
        return false;
      }
    });

    yield put(setSchedule(futureScheduleEvents.map(event => (
      {
        id: event.id,
        startTime: event.startTime || 0,
        endTime: event.endTime || 0,
        title: event.title || '',
        fetchTime: event.fetchTime || 0,
        scheduleTime: event.scheduleTime || 0,
        hostInfo: event.hostInfo || '',
      }
    ))));

    if (isBetweenEvents) {
      const [nextEvent] = schedule;
      if (nextEvent && nextEvent.startTime) {
        try {
          const result = yield call([queries, queries.sequence], nextEvent.startTime);
          yield* sequence(result);
        } catch (error) {
          yield put({type: QUERY_SCHEDULE_FAILED, error: error.message});
          bugsnagClient.notify(error);
        }
      }
    }
  }
}

export {
  currentEvent,
  dispatchData,
};
