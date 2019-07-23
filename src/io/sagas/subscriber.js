// @flow
import type {
  UpdateSubscriberType,
  PublishRequestPasswordResetType,
  PublishResetPasswordType,
  UploadAvatarType,
} from '../../subscriber/dux';
import type {Saga} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import queries from '../queries';
import { errorBanner, infoBanner, passwordResetBanner, textModeBanner } from '../../banner/dux';
import bugsnagClient from '../../util/bugsnag';
import { setPopUpModal, togglePopUpModal } from '../../popUpModal/dux';
import { getCurrentSubscriberAsSharedSubscriber, updateSubscriberSuccess, type UpdateGuestNicknameType } from '../../subscriber/dux';
import { getPublicChannel, getPublicChannelMessage, getTranslateLanguage } from '../../selectors/channelSelectors';
import { publishMessage } from '../../moment';
import { clearChannelMessage } from '../../feed/dux';
import { loginType } from '../../popUpModal/login/dux';
import { resetApp } from '../../chop/dux';
import { requestLivePrayer } from '../../livePrayer/dux';
import { API } from '../API';

function* updateSubscriber (action: UpdateSubscriberType): Saga<void> {
  try {
    const result = yield call([queries, queries.updateSubscriber], action.id, action.input);
    if (result) {
      yield put (updateSubscriberSuccess(action.input));
      const { preferences } = action.input;
      if (preferences && preferences.textMode) {
        yield put (textModeBanner(preferences.textMode));
      } else {
        yield put (infoBanner('update_settings_success'));
      }
    } else {
      throw new Error(`Server returned false for updateSubscriber: ${action.id}`);
    }
  } catch (error) {
    yield put (errorBanner('update_settings_error'));
    bugsnagClient.notify(error);
  }
}

function* updateGuestNickname (action: UpdateGuestNicknameType): Saga<void> {
  try {
    const { nickname } = action;
    const result = yield call([queries, queries.updateSubscriber], action.id, { nickname });
    if (result) {
      yield put (updateSubscriberSuccess({ nickname }));
      yield put (togglePopUpModal());
      const subscriber = yield select (getCurrentSubscriberAsSharedSubscriber);
      if (action.action === 'chat') {
        const language = yield select (getTranslateLanguage);
        const channel = yield select (getPublicChannel);
        const message = yield select (getPublicChannelMessage);
        yield put (publishMessage(channel, message, subscriber, language));
        yield put (clearChannelMessage(channel));
      } else if (action.action === 'prayer') {
        yield put(requestLivePrayer(subscriber.id, subscriber.nickname));
      }
    } else {
      throw new Error(`Server returned false for updateSubscriber: ${action.id}`);
    }
  } catch (error) {
    yield put (errorBanner('update_settings_error'));
    bugsnagClient.notify(error);
  }
}

function* requestPasswordReset (action: PublishRequestPasswordResetType): Saga<void> {
  try {
    yield call([queries, queries.requestPasswordReset], action.email);
  } catch (error) {
    bugsnagClient.notify(error);
  }
}

function* resetPassword (action: PublishResetPasswordType): Saga<void> {
  try {
    const result = yield call([queries, queries.resetPassword], action.resetToken, action.password);
    if (result.resetPassword.success === true) {
      yield put(setPopUpModal(loginType()));
      yield put(passwordResetBanner());
    } else {
      yield put(errorBanner('password_reset_error'));
    }
  } catch (error) {
    bugsnagClient.notify(error);
  }
}

function* uploadAvatar (action: UploadAvatarType): Saga<void> {
  try {
    const { formData } = action;
    const avatar = yield call([API, API.post], '/avatar/upload', { formData });
    const result = yield call([queries, queries.updateSubscriber], action.id, { avatar });
    if (result) {
      yield put (updateSubscriberSuccess({ avatar }));
    } else {
      throw new Error(`Server returned false for updateSubscriber: ${action.id}`);
    }
  } catch (error) {
    yield put (errorBanner('update_settings_error'));
    bugsnagClient.notify(error);
  }
}

function* deleteSelf (): Saga<void> {
  try {
    const result = yield call([queries, queries.deleteSelf]);
    if (result && result.deleteSelf) {
      yield put (resetApp());
      yield put (infoBanner('delete_self_success'));
    } else {
      throw new Error('Server returned false for deleteSelf');
    }
  } catch (error) {
    yield put (errorBanner('delete_self_error'));
    bugsnagClient.notify(error);
  }
}

export {
  updateSubscriber,
  requestPasswordReset,
  resetPassword,
  uploadAvatar,
  updateGuestNickname,
  deleteSelf,
};
