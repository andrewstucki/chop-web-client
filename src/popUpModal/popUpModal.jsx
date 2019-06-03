// @flow
import * as React from 'react';

import {
  LEAVE_CHAT,
  MUTE_SUBSCRIBER,
} from './dux';
import LeaveChatPopUpModal from './leaveChat/';
import MuteSubscriberPopUpModal from './muteSubscriber/';
import type { PopUpModalType } from './dux';
import { Wrapper, PopUpModalContainer, Header } from './styles';
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
  HeaderText?: string,
  isSmall: boolean,
  id: string,
  children?: React.Node,
};

const DismissButton = ({togglePopUpModal}) => (
  <IconButton onClick={togglePopUpModal} id='modal-dismiss-button' size={20}>
    <Dismiss size={20} color={theme.colors.gray50} />
  </IconButton>
);

export const Modal = ({togglePopUpModal, HeaderText =  '', isSmall, id, children}:ModalPropsType) => {
  const modalRef = React.useRef();
  useOnClickOutside(modalRef, () => togglePopUpModal());
  return (
    <Wrapper data-testid='popUpModal'>
      <PopUpModalContainer isSmall={isSmall} data-testid={id} ref={modalRef}>
        <Header hasHeader={HeaderText === '' ? false : true}>
          {HeaderText}
          <DismissButton togglePopUpModal={togglePopUpModal}/>
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
        default:
          return null;
      }
    }
    return null;
  }
}

export default PopUpModal;
