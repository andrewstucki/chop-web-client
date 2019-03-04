// @flow
import React from 'react';

import DirectChatButton from '../../../assets/direct-chat-button.svg';
import DeleteButton from '../../../assets/delete-button.svg';
import MuteButton from '../../../assets/mute-button.svg';
import CloseButton from '../../../assets/close-message-tray-button.svg';
import { Wrapper } from './styles';
import TrayButton from './trayButton';
import { theme } from '../../styles';

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
) => (
  <Wrapper>
    <TrayButton icon={MuteButton} text='Mute' onClick={muteUser} color={theme.colors.dangerText} data-test='muteButton' />
    <TrayButton icon={DeleteButton} text='Delete message' onClick={deleteMessage} color={theme.colors.primary} data-test='deleteButton' />
    <TrayButton icon={DirectChatButton} text='Chat' onClick={directChat} color={theme.colors.primary} data-test='directChatButton' />
    <TrayButton icon={CloseButton} text='Close' onClick={closeTray} color={theme.colors.gray50} data-test='closeButton' />
  </Wrapper>
);

export default React.memo < MessageTrayPropsType > (MessageTray);
