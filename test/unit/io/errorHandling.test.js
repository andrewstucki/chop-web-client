// @flow
import { runSaga } from 'redux-saga';
import { handleDataFetchErrors } from '../../../src/io/sagas/errorHandling';

describe('Error Handling', () => {
  test('No Response', async () => {
    const dispatched = [];
    await runSaga(
      {
        dispatch: action => dispatched.push(action),
      },
      handleDataFetchErrors
    ).toPromise();
  });
});
