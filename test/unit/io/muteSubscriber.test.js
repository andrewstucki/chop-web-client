// @flow
import queries from '../../../src/io/queries';
import { muteSubscriber } from '../../../src/io/saga';
import { runSaga } from 'redux-saga';
import {PUBLISH_MUTE_SUBSCRIBER, MUTE_SUBSCRIBER_SUCCEEDED, MUTE_SUBSCRIBER_FAILED} from '../../../src/subscriber/dux';

jest.mock('../../../src/io/queries');
const mock = (mockFn: any) => mockFn;

describe('Test Mute Subscriber', () => {
  const mockMuteSubscriber = mock(queries.muteSubscriber);
  test('Mute subscriber success', async () => {
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, muteSubscriber, {type: PUBLISH_MUTE_SUBSCRIBER, channelId: '12345', subscriberName: 'James T. Kirk'}).toPromise();

    expect(mockMuteSubscriber).toBeCalledWith('12345', 'James T. Kirk');
    expect(dispatched).toEqual([{type: MUTE_SUBSCRIBER_SUCCEEDED, name: 'James T. Kirk'}]);
  });

  test('Mute subscriber server returned false', async () => {
    mockMuteSubscriber.mockResolvedValue({muteSubscriber: false});
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, muteSubscriber, {type: PUBLISH_MUTE_SUBSCRIBER, channelId: '12345', subscriberName: 'James T. Kirk'}).toPromise();

    expect(mockMuteSubscriber).toBeCalledWith('12345', 'James T. Kirk');
    expect(dispatched).toEqual([{type: MUTE_SUBSCRIBER_FAILED, name: 'James T. Kirk', error: 'Server returned false for muteSubscriber: James T. Kirk'}]);
  });

  test('Mute subscriber failure', async () => {
    mockMuteSubscriber.mockImplementation(() => {
      throw new Error('Broken');
    });

    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, muteSubscriber, {type: PUBLISH_MUTE_SUBSCRIBER, channelId: '12345', subscriberName: 'James T. Kirk'}).toPromise();

    expect(mockMuteSubscriber).toBeCalledWith('12345', 'James T. Kirk');
    expect(dispatched).toEqual([{type: MUTE_SUBSCRIBER_FAILED, name: 'James T. Kirk', error: 'Broken'}]);
  });
});