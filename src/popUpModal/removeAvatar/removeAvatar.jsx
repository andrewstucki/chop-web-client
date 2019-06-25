// @flow
import React from 'react';

import { useTranslation } from 'react-i18next';
import { Button, ActionContainer, Text, REGRESS, DANGER } from '../styles';
import Modal from '../modal';

type RemoveAvatarPropsType = {
  currentSubscriberId: string,
  removeAvatar: (id:string) => void,
  togglePopUpModal: () => void,
  isSmall: boolean,
};

const RemoveAvatarPopUpModal = (
  {
    currentSubscriberId,
    removeAvatar,
    togglePopUpModal,
    isSmall,
  }: RemoveAvatarPropsType
) => {
  const { t } = useTranslation('forms');

  const handleRemoveAvatar = () => removeAvatar(currentSubscriberId);

  return (
    <Modal togglePopUpModal={togglePopUpModal} isSmall={isSmall} id="removeAvatar-modal">
      <Text data-testid='removeAvatar-confirmText'>
        { t('remove_avatar.message') }
      </Text>
      <ActionContainer>
        <Button buttonType={REGRESS} onClick={togglePopUpModal} data-testid='removeAvatar-cancel' >
          { t('remove_avatar.cancel') }
        </Button>
        <Button buttonType={DANGER} onClick={handleRemoveAvatar} data-testid='removeAvatar-confirm'>
          { t('remove_avatar.confirm') }
        </Button>
      </ActionContainer>
    </Modal>
  );
};

export default RemoveAvatarPopUpModal;
