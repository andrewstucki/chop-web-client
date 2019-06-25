// @flow
import React, { type Node } from 'react';
import IconButton from '../components/iconButton';
import Dismiss from '../icons/dismissButton';
import { useOnClickOutside } from '../hooks/useOnClickOutside';
import { Header, PopUpModalContainer, Wrapper } from './styles';
import { theme } from '../styles';

export type ModalPropsType = {
  togglePopUpModal: () => void,
  HeaderText?: string,
  isSmall: boolean,
  id: string,
  children?: Node,
  includePadding?: boolean,
  showDismissButton?: boolean,
};

const DismissButton = ({togglePopUpModal}) => (
  <IconButton styles={{position: 'absolute', right: '20px', top: '20px'}} onClick={togglePopUpModal} id='modal-dismiss-button' size={20}>
    <Dismiss size={20} color={theme.colors.gray50} />
  </IconButton>
);

const Modal = ({togglePopUpModal, HeaderText =  '', isSmall, id, children, showDismissButton = false, includePadding = true}:ModalPropsType) => {
  const modalRef = React.useRef();
  useOnClickOutside(modalRef, () => togglePopUpModal());
  return (
    <Wrapper data-testid='popUpModal'>
      <PopUpModalContainer isSmall={isSmall} data-testid={id} ref={modalRef} includePadding={includePadding}>
        { HeaderText &&
        <Header>{HeaderText}</Header>
        }
        { showDismissButton && <DismissButton togglePopUpModal={togglePopUpModal}/> }
        {children}
      </PopUpModalContainer>
    </Wrapper>
  );
};

export default Modal;
