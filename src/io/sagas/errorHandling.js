// @flow
import { call, put } from 'redux-saga/effects';
import {addError} from '../../errors/dux';
import type {Saga} from 'redux-saga';
import {
  removeAuthentication,
} from '../../auth/dux';

// eslint-disable-next-line no-console
const log = message => console.log(message);

function* handleDataFetchErrors (payload: any): Saga<void> {
  if (payload?.error?.response?.errors) {
    const { response: { errors } } = payload.error;
    yield call(log, 'The graphql response returned errors:');
    for (const err in errors) {
      const { message, extensions, path } = errors[err];

      if (message) {
        yield put(addError(message));
        yield call(log, ` - ${message}`);
      }
      if (
        extensions && extensions.code === 'UNAUTHORIZED' ||
        extensions && extensions.code === 'INTERNAL_SERVER_ERROR' && path === 'authenticate'
      ) {
        yield put(removeAuthentication());
      }
    }
  } else {
    yield call(log, 'The graphql response returned an error code but no error messages.');
  }
}

export {handleDataFetchErrors};
