// @flow
import {call, put, select} from 'redux-saga/effects';
import type {Saga} from 'redux-saga';
import queries from '../queries';
import {
  setPubnubKeys,
  QUERY_CURRENT_EVENT_FAILED,
  setUser,
  setOrganization,
  setLanguageOptions,
  setEvent,
} from '../../feed/dux';
import bugsnagClient from '../../util/bugsnag';
import {avatarImageExists} from '../../util';
import {getLanguageCount} from '../../selectors/languageSelector';

function* currentEvent (): Saga<void> {
  const languageCount = yield select(getLanguageCount);
  const needLanguages = languageCount === 0;
  try {
    const result = yield call([queries, queries.currentState], needLanguages);
    yield* dispatchData(result);
  } catch (error) {
    yield put({type: QUERY_CURRENT_EVENT_FAILED, error: error.message});
    bugsnagClient.notify(error);
  }
}

function* dispatchData (data: any): Saga<void> {
  yield* pubnubKeys(data);
  yield* currentUser(data);
  yield* organization(data);
  yield* languageOptions(data);
  yield* event(data);
}

function* pubnubKeys (data: any): Saga<void> {
  if (data.pubnubKeys) {
    const { pubnubKeys: { publishKey, subscribeKey } } = data;
    yield put(setPubnubKeys(publishKey, subscribeKey));
  }
}

function* currentUser (data:any): Saga<void> {
  if (data.currentUser) {
    const { currentUser: { id, nickname: name, avatar, pubnubAccessKey, pubnubToken, role: { label = '', permissions = [] } } } = data;
    yield put(
      setUser(
        {
          id,
          name,
          avatar,
          pubnubAccessKey,
          pubnubToken,
          role: {
            label,
            permissions,
          },
        }
      )
    );
    const exists = yield call(avatarImageExists, id);
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

function* organization (data: any): Saga<void> {
  if (data.organization) {
    const { organization: { id, name } } = data;
    yield put(setOrganization(id, name));
  }
}

function* languageOptions (data: any): Saga<void> {
  if (data.currentLanguages) {
    const { currentLanguages } = data;
    yield put(setLanguageOptions(currentLanguages));
  }
}

function* event (data: any): Saga<void> {
  const event = data.currentEvent || data.eventAt;
  if (event && event.id) {
    yield put(
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
}

export {
  currentEvent,
  dispatchData,
};
