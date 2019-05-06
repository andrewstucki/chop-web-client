// @flow
import React from 'react';

import DirectChatButton from '../../../assets/direct-chat-button.svg';
import DeleteButton from '../../../assets/delete-button.svg';
import MuteButton from '../../../assets/mute-button.svg';
import CloseButton from '../../../assets/close-message-tray-button.svg';
import { Wrapper } from './styles';
import TrayButton, { CLOSE_TRAY } from './trayButton';
import { theme } from '../../styles';
import { useTranslation } from 'react-i18next';

type MessageTrayPropsType = {
  closeTray: (id: string) => void,
  deleteMessage: (id: string, channel:string) => void,
  muteUser: (pubnubToken: string) => void,
  directChat: (pubnubToken: string, nickname: string) => void,
};

const MessageTray = (
  {
    closeTray,
    deleteMessage,
    muteUser,
    directChat,
  }: MessageTrayPropsType,
) => {
  const { t } = useTranslation();
  return (
    <Wrapper>
      <TrayButton icon={MuteButton} text={t('buttons.mute_user')} onClick={muteUser} color={theme.colors.dangerText} data-testid='muteButton' />
      <TrayButton icon={DeleteButton} text={t('buttons.delete_message')} onClick={deleteMessage} color={theme.colors.primary} data-testid='deleteButton' />
      <TrayButton icon={DirectChatButton} text={t('buttons.direct_chat')} onClick={directChat} color={theme.colors.primary} data-testid='directChatButton' />
      <TrayButton type={CLOSE_TRAY} icon={CloseButton} text={t('buttons.close')} onClick={closeTray} color={theme.colors.gray50} data-testid='closeButton' />
    </Wrapper>
  );
};

export default React.memo < MessageTrayPropsType > (MessageTray);
