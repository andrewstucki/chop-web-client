// @flow
import type {UpdateSubscriberType, PublishRequestPasswordResetType, PublishResetPasswordType} from '../../subscriber/dux';
import type {Saga} from 'redux-saga';
import {call, put, select} from 'redux-saga/effects';
import queries from '../queries';
import {UPDATE_SUBSCRIBER_FAILED, updateSubscriberSucceeded, getCurrentSubscriberAsSharedSubscriber} from '../../subscriber/dux';
import { textModeBanner, passwordResetBanner, errorBanner } from '../../banner/dux';
import { setPopUpModal, togglePopUpModal } from '../../popUpModal/dux';
import { loginType } from '../../popUpModal/login/dux';
import bugsnagClient from '../../util/bugsnag';
import { getTranslateLanguage, getCurrentChannel, getPublicChannelMessage } from '../../selectors/channelSelectors';
import { publishMessage } from '../../moment';
import { clearChannelMessage } from '../../feed/dux';

function* updateSubscriber (action: UpdateSubscriberType): Saga<void> {
  try {
    const result = yield call([queries, queries.updateSubscriber], action.id, action.input);
    if (result) {
      yield put(updateSubscriberSucceeded(action.input));
      if (action.input.preferences) {
        // $FlowFixMe
        yield put (textModeBanner(action.input.preferences?.textMode));
      } else if (action.input.nickname) {
        const language = yield select (getTranslateLanguage);
        const subscriber = yield select (getCurrentSubscriberAsSharedSubscriber);
        const channel = yield select (getCurrentChannel);
        const message = yield select (getPublicChannelMessage);
        yield put (publishMessage(channel, message, subscriber, language));
        yield put (togglePopUpModal());
        yield put (clearChannelMessage(channel));
      }
    } else {
      yield put({type: UPDATE_SUBSCRIBER_FAILED, id: action.id, error: `Server returned false for updateSubscriber: ${action.id}`});
      bugsnagClient.notify(new Error(`Server returned false for updateSubscriber: ${action.id}`));
    }
  } catch (error) {
    yield put({type: UPDATE_SUBSCRIBER_FAILED, name: action.id, error: error.message});
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

export {
  updateSubscriber,
  requestPasswordReset,
  resetPassword,
};
