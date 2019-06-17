// @flow
import * as React from 'react';

import LeaveChatPopUpModal from './leaveChat';
import { LEAVE_CHAT } from './leaveChat/dux';
import MuteSubscriberPopUpModal from './muteSubscriber/';
import { MUTE_SUBSCRIBER } from './muteSubscriber/dux';
import GuestNicknamePopUpModal from './guestNickname';
import { GUEST_NICKNAME } from './guestNickname/dux';
import LogInPopUpModal from './login';
import { LOGIN } from './login/dux';
import ResetPasswordPopUpModal from './resetPassword';
import { RESET_PASSWORD } from './resetPassword/dux';
import RequestPasswordResetPopUpModal from './requestPasswordReset';
import { REQUEST_PASSWORD_RESET } from './requestPasswordReset/dux';
import type { PopUpModalType } from './dux';
import { Wrapper, PopUpModalContainer, Header, DismissButtonWrapper } from './styles';
import { theme } from '../styles';
import Dismiss from '../icons/dismissButton';
import IconButton from '../components/iconButton';
import { useOnClickOutside } from '../hooks/useOnClickOutside';

type PopUpModalPropsType = {
  isSmall: boolean,
  isPopUpModalVisible: boolean,
  modal: PopUpModalType,
  togglePopUpModal: () => void,
};

export type ModalPropsType = {
  togglePopUpModal: () => void,
  header?: string,
  isSmall: boolean,
  id: string,
  children?: React.Node,
};

const DismissButton = ({togglePopUpModal}) => (
  <IconButton onClick={togglePopUpModal} id='modal-dismiss-button' size={20}>
    <Dismiss size={20} color={theme.colors.gray50} />
  </IconButton>
);

export const Modal = ({togglePopUpModal, header = '', isSmall, id, children}:ModalPropsType) => {
  const modalRef = React.useRef();
  useOnClickOutside(modalRef, () => togglePopUpModal());
  return (
    <Wrapper data-testid='popUpModal'>
      <PopUpModalContainer isSmall={isSmall} data-testid={id} ref={modalRef}>
        <Header hasHeader={header === '' ? false : true}>
          {header}
          <DismissButtonWrapper>
            <DismissButton togglePopUpModal={togglePopUpModal}/>
          </DismissButtonWrapper>
        </Header>
        {children}
      </PopUpModalContainer>
    </Wrapper>
  );
};

class PopUpModal extends React.Component<PopUpModalPropsType> {
  render () {
    const { isSmall, modal, isPopUpModalVisible, togglePopUpModal } = this.props;
    if (isPopUpModalVisible) {
      switch (modal.type) {
        case LEAVE_CHAT:
          return (
            <LeaveChatPopUpModal
              togglePopUpModal={togglePopUpModal}
              isSmall={isSmall}
            />
          );
        case MUTE_SUBSCRIBER:
          return (
            <MuteSubscriberPopUpModal
              togglePopUpModal={togglePopUpModal}
              subscriber={modal.subscriber}
              channelId={modal.channelId}
              isSmall={isSmall}
            />
          );
        case GUEST_NICKNAME:
          return (
            <GuestNicknamePopUpModal
              togglePopUpModal={togglePopUpModal}
              message={modal.message}
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
        default:
          return null;
      }
    }
    return null;
  }
}

export default PopUpModal;
