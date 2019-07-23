// @flow
import queries from '../../../src/io/queries';
import {
  updateSubscriber as updateSubscriberSaga,
  resetPassword as resetPasswordSaga,
  requestPasswordReset as requestPasswordResetSaga,
  updateGuestNickname as updateGuestNicknameSaga,
  uploadAvatar as uploadAvatarSaga,
  deleteSelf as deleteSelfSaga,
} from '../../../src/io/sagas/subscriber';
import { runSaga } from 'redux-saga';
import {
  updateSubscriberSuccess,
  updateTextMode,
  updateSubscriber,
  publishResetPassword,
  publishRequestPasswordReset,
  updateGuestNickname,
  uploadAvatar,
  deleteSelf,
} from '../../../src/subscriber/dux';
import { COMFORTABLE } from '../../../src/textModeToggle/dux';
import { textModeBanner, passwordResetBanner, errorBanner, infoBanner } from '../../../src/banner/dux';
import { setPopUpModal, togglePopUpModal } from '../../../src/popUpModal/dux';
import { loginType } from '../../../src/popUpModal/login/dux';
import { clearChannelMessage } from '../../../src/feed/dux';
import { newTimestamp } from '../../../src/util';
import { defaultState, mockDate } from '../../testUtils';
import { resetApp } from '../../../src/chop/dux';

jest.mock('../../../src/io/queries');
const mock = (mockFn: any) => mockFn;

describe('Test Update Subscriber', () => {
  const mockUpdateSubscriber = mock(queries.updateSubscriber);
  const mockUpdatePassword = mock(queries.resetPassword);
  const mockRequestPasswordUpdate = mock(queries.requestPasswordReset);
  const mockDeleteSelf = mock(queries.deleteSelf);

  test('Update subscriber preferences success', async () => {
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, updateSubscriberSaga, updateSubscriber('12345', updateTextMode(COMFORTABLE))).toPromise();

    expect(mockUpdateSubscriber).toBeCalledWith('12345', {preferences: {textMode: COMFORTABLE}});
    expect(dispatched).toEqual(
      [
        updateSubscriberSuccess(
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

  test('Update guest nickname success', async () => {
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
    }, updateGuestNicknameSaga, updateGuestNickname('123456','guest', 'chat')).toPromise();

    expect(mockUpdateSubscriber).toBeCalledWith('123456', {nickname: 'guest'});
    expect(dispatched).toEqual(
      [
        updateSubscriberSuccess(
          {
            nickname: 'guest',
          }
        ),
        togglePopUpModal(),
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
        errorBanner('update_settings_error'),
      ]
    );
  });

  test('Update subscriber nickname fail', async () => {
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
    }, updateSubscriberSaga, updateSubscriber('123456', { nickname: 'guest6' })).toPromise();

    expect(dispatched).toEqual(
      [
        errorBanner('update_settings_error'),
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

  test('Upload avatar success', async () => {
    // $FlowFixMe - Fetch gets monkey patched in setupFile.js
    fetch.mockResponseOnce('https://google.com/avatars/me/avatar.jpg', { status: 200, headers: { 'content-type': 'text/plain' }});
    mockUpdateSubscriber.mockResolvedValue(true);

    const dispatched = [];
    const formData = new FormData();

    formData.append('avatar', new File([''], 'avatar.jpg', { type: 'image/jpeg'} ));

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => defaultState,
    }, uploadAvatarSaga, uploadAvatar('12345', formData)).toPromise();

    expect(dispatched).toEqual([
      updateSubscriberSuccess({ avatar: 'https://google.com/avatars/me/avatar.jpg' }),
    ]);
  });

  test('Delete self success', async () => {
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => defaultState,
    }, deleteSelfSaga, deleteSelf()).toPromise();

    expect(dispatched).toEqual([
      resetApp(),
      infoBanner('delete_self_success'),
    ]);
    expect(mockDeleteSelf).toBeCalledTimes(1);
  });


  test('Delete self failed', async () => {
    mockDeleteSelf.mockReset();
    mockDeleteSelf.mockResolvedValue({ deleteSelf: false });
    const dispatched = [];

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => defaultState,
    }, deleteSelfSaga, deleteSelf()).toPromise();

    expect(dispatched).toEqual([
      errorBanner('delete_self_error'),
    ]);
    expect(mockDeleteSelf).toBeCalledTimes(1);
  });
});
