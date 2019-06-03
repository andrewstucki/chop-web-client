// @flow
import queries from '../../../src/io/queries';
import { updateSubscriber as updateSubscriberSaga } from '../../../src/io/sagas/subscriber';
import { runSaga } from 'redux-saga';
import {
  UPDATE_SUBSCRIBER_FAILED,
  updateSubscriberSucceeded,
  updateTextMode,
  updateSubscriber,
} from '../../../src/subscriber/dux';
import { COMFORTABLE } from '../../../src/textModeToggle/dux';
import { textModeNotificationBanner } from '../../../src/banner/dux';

jest.mock('../../../src/io/queries');
const mock = (mockFn: any) => mockFn;

describe('Test Update Subscriber', () => {
  const mockUpdateSubscriber = mock(queries.updateSubscriber);
  test('Update subscriber success', async () => {
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, updateSubscriberSaga, updateSubscriber('12345', updateTextMode(COMFORTABLE))).toPromise();

    expect(mockUpdateSubscriber).toBeCalledWith('12345', {preferences: {textMode: COMFORTABLE}});
    expect(dispatched).toEqual(
      [
        updateSubscriberSucceeded(
          {
            preferences: {
              textMode: COMFORTABLE,
            },
          }
        ),
        textModeNotificationBanner(COMFORTABLE),
      ]
    );
  });

  test('Update subscriber fail', async () => {
    const dispatched = [];
    mockUpdateSubscriber.mockResolvedValue(false);

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, updateSubscriberSaga, updateSubscriber('12345', updateTextMode(COMFORTABLE))).toPromise();

    expect(dispatched).toEqual(
      [
        {type: UPDATE_SUBSCRIBER_FAILED, id: '12345', error: 'Server returned false for updateSubscriber: 12345'},
      ]
    );
  });
});
