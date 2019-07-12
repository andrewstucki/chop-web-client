// @flow
import { call } from 'redux-saga/effects';
import type {Saga} from 'redux-saga';

// eslint-disable-next-line no-console
const log = message => console.log(message);

function* handleDataFetchErrors (payload: any): Saga<void> {
  if (payload?.error?.response?.errors) {
    const { response: { errors } } = payload.error;
    yield call(log, 'The graphql response returned errors:');
    for (const err in errors) {
      const { message } = errors[err];

      if (message) {
        yield call(log, ` - ${message}`);
      }
    }
  } else {
    yield call(log, 'The graphql response returned an error code but no error messages.');
  }
}

export {handleDataFetchErrors};
