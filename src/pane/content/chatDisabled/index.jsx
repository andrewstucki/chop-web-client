// @flow
import React from 'react';
import publicChatBubbles from '../../../../assets/public_chat_bubbles@2x.png';
import { useTranslation } from 'react-i18next';
import { PublicChatDisabled } from './styles';

const ChatDisabled = () => {
  const { t } = useTranslation();

  return (
    <PublicChatDisabled data-testid='chatDisabled'>
      <img src={publicChatBubbles} alt={t('public_chat_disabled')}/>
      <p>{t('public_chat_disabled')}</p>
    </PublicChatDisabled>
  );
};

export default ChatDisabled;
