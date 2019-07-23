// @flow
import * as React from 'react';

import type { PopUpModalType } from './dux';
import ProfileSettingsPopUpModal from './profileSettings';
import { PROFILE_SETTINGS } from './profileSettings/dux';
import LeaveChatPopUpModal from './leaveChat';
import { LEAVE_CHAT } from './leaveChat/dux';
import MuteSubscriberPopUpModal from './muteSubscriber/';
import { MUTE_SUBSCRIBER } from './muteSubscriber/dux';
import ChatSetNicknamePopUpModal from './chatSetNickname';
import { CHAT_SET_NICKNAME } from './chatSetNickname/dux';
import LivePrayerSetNicknamePopUpModal from './livePrayerSetNickname';
import { LIVE_PRAYER_SET_NICKNAME } from './livePrayerSetNickname/dux';
import LogInPopUpModal from './login';
import { LOGIN } from './login/dux';
import ResetPasswordPopUpModal from './resetPassword';
import { RESET_PASSWORD } from './resetPassword/dux';
import RequestPasswordResetPopUpModal from './requestPasswordReset';
import { REQUEST_PASSWORD_RESET } from './requestPasswordReset/dux';
import RemoveAvatarPopUpModal from './removeAvatar';
import { REMOVE_AVATAR } from './removeAvatar/dux';
import DeleteAccountPopUpModal from './deleteAccount';
import { DELETE_ACCOUNT } from './deleteAccount/dux';

type PopUpModalProps = {
  isSmall: boolean,
  isPopUpModalVisible: boolean,
  modal: PopUpModalType,
  togglePopUpModal: () => void,
};

const PopUpModal = ({ isSmall, modal, isPopUpModalVisible, togglePopUpModal }:PopUpModalProps) => {
  if (isPopUpModalVisible && modal.type) {
    switch (modal.type) {
      case LEAVE_CHAT:
        return (
          <LeaveChatPopUpModal
            togglePopUpModal={togglePopUpModal}
            isSmall={isSmall}
          />
        );
      case MUTE_SUBSCRIBER:
        if (modal.subscriber && modal.channelId) {
          return (
            <MuteSubscriberPopUpModal
              togglePopUpModal={togglePopUpModal}
              subscriber={modal.subscriber}
              channelId={modal.channelId}
              isSmall={isSmall}
            />
          );
        } else {
          return null;
        }
      case PROFILE_SETTINGS:
        return (
          <ProfileSettingsPopUpModal
            togglePopUpModal={togglePopUpModal}
            isSmall={isSmall}
          />
        );
      case CHAT_SET_NICKNAME:
        return (
          <ChatSetNicknamePopUpModal
            togglePopUpModal={togglePopUpModal}
            isSmall={isSmall}
          />
        );
      case LIVE_PRAYER_SET_NICKNAME:
        return (
          <LivePrayerSetNicknamePopUpModal
            togglePopUpModal={togglePopUpModal}
            isSmall={isSmall}
          />
        );
      case LOGIN:
        return (
          <LogInPopUpModal
            togglePopUpModal={togglePopUpModal}
            isSmall={isSmall}
          />
        );
      case RESET_PASSWORD:
        if (modal.resetToken) {
          return (
            <ResetPasswordPopUpModal
              togglePopUpModal={togglePopUpModal}
              isSmall={isSmall}
              resetToken={modal.resetToken}
            />
          );
        } else {
          togglePopUpModal();
          return null;
        }
      case REQUEST_PASSWORD_RESET:
        return (
          <RequestPasswordResetPopUpModal
            togglePopUpModal={togglePopUpModal}
            isSmall={isSmall}
          />
        );
      case REMOVE_AVATAR:
        return (
          <RemoveAvatarPopUpModal
            isSmall={isSmall}
          />
        );
      case DELETE_ACCOUNT:
        return (
          <DeleteAccountPopUpModal
            isSmall={isSmall}
          />
        );
      default:
        return null;
    }
  }
  return null;
};

export default PopUpModal;
