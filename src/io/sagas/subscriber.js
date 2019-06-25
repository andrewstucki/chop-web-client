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
import { getAccessToken } from '../../selectors/authSelectors';
import { getCurrentSubscriberAsSharedSubscriber, updateSubscriberSuccess, type UpdateGuestNicknameType } from '../../subscriber/dux';
import { getPublicChannel, getPublicChannelMessage, getTranslateLanguage } from '../../selectors/channelSelectors';
import { publishMessage } from '../../moment';
import { clearChannelMessage } from '../../feed/dux';
import { loginType } from '../../popUpModal/login/dux';
import { resetApp } from '../../chop/dux';

declare var GATEWAY_HOST: string;

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
      const language = yield select (getTranslateLanguage);
      const subscriber = yield select (getCurrentSubscriberAsSharedSubscriber);
      const channel = yield select (getPublicChannel);
      const message = yield select (getPublicChannelMessage);
      yield put (publishMessage(channel, message, subscriber, language));
      yield put (togglePopUpModal());
      yield put (clearChannelMessage(channel));
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
    const accessToken = yield select(getAccessToken);
    const avatar = yield call(callUploadAvatar, action.formData, accessToken);
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

const callUploadAvatar = async (formData:FormData, accessToken:string):Promise<string> => {
  const response = await fetch(`${GATEWAY_HOST}/avatar/upload`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });
  return await response.text();
};

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
