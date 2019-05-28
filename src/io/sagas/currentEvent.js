// @flow
import {call, put, select} from 'redux-saga/effects';
import type {Saga} from 'redux-saga';
import queries from '../queries';
import type {
  GraphQLCurrentStateType,
  GraphQLEventType,
  GraphQLChannelType,
  GraphQLEventAtType,
  GraphQLVideoType,
  GraphQLSequenceType,
} from '../queries';
import {
  setPubnubKeys,
  QUERY_CURRENT_EVENT_FAILED,
  setUser,
  setOrganization,
  setLanguageOptions,
  setEvent,
  setChannels,
} from '../../feed/dux';
import {
  setSchedule,
  QUERY_SCHEDULE_FAILED,
} from '../../schedule/dux';
import bugsnagClient from '../../util/bugsnag';
import { avatarImageExists } from '../../util';
import {getLanguageCount} from '../../selectors/languageSelector';
import {setVideo} from '../../videoFeed/dux';
import type {ChannelsObjectType} from '../../feed/dux';
import {convertUser} from './privateChat';
import {isOffline} from '../../selectors/eventSelectors';
import {COMPACT} from '../../textModeToggle/dux';
import { startTimer } from './sequence';
import { PRIMARY_PANE } from '../../pane/dux';
import { setPaneToEvent } from '../../pane/content/event/dux';
import { theme } from '../../styles';

const isTimeInFuture = (seconds: number): boolean => (seconds * 1000) > Date.now();

const convertChannel = (channels: Array<GraphQLChannelType>): ChannelsObjectType => {
  const channelsObj = {};
  channels.forEach(channel => {
    channelsObj[channel.id] = {
      ...channel,
      participants: channel.participants && channel.participants.length > 0 ? channel.participants.map(convertUser) : [],
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
    yield call(startTimer);
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
    const { currentUser: { id, name, avatar, pubnubAccessKey, pubnubToken, role: { label = '', permissions = [] }, preferences: { textMode = COMPACT } } } = data;
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
            permissions: permissions.map(permission => permission.key),
          },
          preferences: {
            textMode,
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
    const { currentOrganization: { id, name, logoUrl, theme:queryTheme } } = data;
    const organizationTheme = {
      headerBackgroundColor: queryTheme.headerBackgroundColor || theme.colors.gray5,
      headerMenuIconColor: queryTheme.headerMenuIconColor || theme.colors.gray50,
    };
    yield put(setOrganization(id, name || '', logoUrl || '', organizationTheme));
  }
}

function* languageOptions (data: GraphQLCurrentStateType): Saga<void> {
  if (data.currentLanguages) {
    const { currentLanguages } = data;
    yield put(setLanguageOptions(currentLanguages));
  }
}

export function* event (data: GraphQLCurrentStateType): Saga<void> {
  const { currentEvent: event } = data;
  if (event) {
    yield* eventMain(event);
    yield* sequence(event.sequence);
    yield* channels(event.feeds);
    yield* video(event.video);
  }
}

export function* eventAt (event: GraphQLEventAtType): Saga<void> {
  if (event) {
    yield* eventMain(event);
    yield* channels(event.feeds);
    yield* video(event.video);
  }
}

function* eventMain (event: GraphQLEventAtType | GraphQLEventType): Saga<void> {
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
      event.enabledFeatures || { chat: false },
    )
  );
}

export function* sequence (sequence: GraphQLSequenceType): Saga<void> {
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

function* channels (channels: Array<GraphQLChannelType>): Saga<void> {
  if (channels) {
    yield put(setChannels(convertChannel(channels)));
    const [publicChannel] = channels.filter(channel => channel.type === 'public');
    if (publicChannel) {
      yield put(setPaneToEvent(PRIMARY_PANE, publicChannel.id));
    }
  }
}

function* video (video: GraphQLVideoType): Saga<void> {
  if (video) {
    yield put(
      setVideo(
        video.url || '',
        video.type || 'none',
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
