// @flow
import React from 'react';
import Modal from '../modal';
import { useTranslation } from 'react-i18next';
import { Button, ActionContainer, Text, REGRESS, DANGER } from '../styles';

type DeleteAccountPropsType = {
  deleteAccount: () => void,
  togglePopUpModal: () => void,
  isSmall: boolean,
};

const DeleteAccountPopUpModal = (
  {
    deleteAccount,
    togglePopUpModal,
    isSmall,
  }: DeleteAccountPropsType
) => {
  const { t } = useTranslation('forms');

  return (
    <Modal togglePopUpModal={togglePopUpModal} isSmall={isSmall} id="deleteAccount-modal">
      <Text data-testid='deleteAccount-confirmText'>
        { t('delete_account.message') }
      </Text>
      <ActionContainer>
        <Button buttonType={REGRESS} onClick={togglePopUpModal} data-testid='deleteAccount-cancel' >
          { t('delete_account.cancel') }
        </Button>
        <Button buttonType={DANGER} onClick={deleteAccount} data-testid='deleteAccount-confirm'>
          { t('delete_account.confirm') }
        </Button>
      </ActionContainer>
    </Modal>
  );
};

export default DeleteAccountPopUpModal;
