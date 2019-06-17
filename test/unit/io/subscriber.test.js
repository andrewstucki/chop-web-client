// @flow
import queries from '../../../src/io/queries';
import { 
  updateSubscriber as updateSubscriberSaga, 
  resetPassword as resetPasswordSaga,
  requestPasswordReset as requestPasswordResetSaga,
} from '../../../src/io/sagas/subscriber';
import { runSaga } from 'redux-saga';
import {
  UPDATE_SUBSCRIBER_FAILED,
  updateSubscriberSucceeded,
  updateTextMode,
  updateSubscriber,
  publishResetPassword,
  publishRequestPasswordReset,
  updateNickname,
} from '../../../src/subscriber/dux';
import { COMFORTABLE } from '../../../src/textModeToggle/dux';
import { textModeBanner, passwordResetBanner, errorBanner } from '../../../src/banner/dux';
import { setPopUpModal, togglePopUpModal } from '../../../src/popUpModal/dux';
import { loginType } from '../../../src/popUpModal/login/dux';
import { clearChannelMessage } from '../../../src/feed/dux';
import { newTimestamp } from '../../../src/util';
import { mockDate } from '../../testUtils';

jest.mock('../../../src/io/queries');
const mock = (mockFn: any) => mockFn;

describe('Test Update Subscriber', () => {
  const mockUpdateSubscriber = mock(queries.updateSubscriber);
  const mockUpdatePassword = mock(queries.resetPassword);
  const mockRequestPasswordUpdate = mock(queries.requestPasswordReset);

  test('Update subscriber preferences success', async () => {
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
        textModeBanner(COMFORTABLE),
      ]
    );
  });

  test('Update subscriber nickname success', async () => {
    const dispatched = [];
    mockDate(1553807000000);

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => (
        {
          subscriber: {
            currentSubscriber: {
              id: '123456',
              nickname: 'guest',
              pubnubAccessKey: '1533912921585',
              role: {
                label: '',
              },
            },
          },
          feed: {
            channels: {
              '123456': {
                name: 'public',
                id: '123456',
                direct: false,
                moments: [],
                message: 'hi',
              },
            },
            currentLanguage: 'en-US',
            panes: {
              primary: {
                type: 'CHAT',
                content: {
                  channelId: '123456',
                },
              },
            },
          },
        }
      ),
    }, updateSubscriberSaga, updateSubscriber('123456', updateNickname('guest'))).toPromise();

    expect(mockUpdateSubscriber).toBeCalledWith('123456', {nickname: 'guest'});
    expect(dispatched).toEqual(
      [
        updateSubscriberSucceeded(
          {
            nickname: 'guest',
          }
        ),
        {
          type: 'PUBLISH_MOMENT_TO_CHANNEL',
          channel: '123456',
          moment: {
            type: 'MESSAGE',
            id: expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/),
            timestamp: newTimestamp(),
            lang: 'en',
            text: 'hi',
            subscriber: {
              id: '123456',
              nickname: 'guest',
              role: {
                label: '',
              },
              avatar: undefined,
            },
            messageTrayOpen: false,
            isMuted: false,
          },
        },
        togglePopUpModal(),
        clearChannelMessage('123456'),
      ]
    );
  });

  test('Update subscriber preferences fail', async () => {
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

  test('Update subscriber nickname fail', async () => {
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, updateSubscriberSaga, updateSubscriber('123456', updateNickname('guest6'))).toPromise();

    expect(dispatched).toEqual(
      [
        {type: UPDATE_SUBSCRIBER_FAILED, id: '123456', error: 'Server returned false for updateSubscriber: 123456'},
      ]
    );
  });

  test('Update password success', async () => {
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, resetPasswordSaga, publishResetPassword('12345', 'joe@test.com')).toPromise();

    expect(mockUpdatePassword).toBeCalledWith('12345', 'joe@test.com');
    expect(dispatched).toEqual(
      [
        setPopUpModal(loginType()),
        passwordResetBanner(),
      ]
    );
  });

  test('Update password fail', async () => {
    const dispatched = [];
    mockUpdatePassword.mockResolvedValue({
      resetPassword: {
        success: false,
      },
    });

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, resetPasswordSaga, publishResetPassword('12345', 'joe@test.com')).toPromise();

    expect(dispatched).toEqual(
      [
        errorBanner('password_reset_error'),
      ]
    );
  });

  test('Request password update success', async () => {
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, requestPasswordResetSaga, publishRequestPasswordReset('joe@test.com')).toPromise();

    expect(mockRequestPasswordUpdate).toBeCalledWith('joe@test.com');
    expect(dispatched).toEqual(
      []
    );
  });
});
