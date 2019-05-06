// @flow
import React from 'react';
import { Wrapper, TrayButton } from './styles';
import { useTranslation } from 'react-i18next';

type MessageTrayPropsType = {
  messageTrayOpen: boolean,
  isCompact: boolean,
  chatPermissions: boolean,
  moderationPermissions: boolean,
  deleteMessage: (id: string, channel:string) => void,
  muteUser: (pubnubToken: string) => void,
  directChat: (pubnubToken: string, nickname: string) => void,
};

const MessageTray = (
  {
    messageTrayOpen,
    isCompact,
    deleteMessage,
    muteUser,
    directChat,
    chatPermissions,
    moderationPermissions,
  }: MessageTrayPropsType,
) => {
  const { t } = useTranslation();
  return (
    <Wrapper messageTrayOpen={messageTrayOpen} isCompact={isCompact} data-testid='messageTray'>
      { moderationPermissions &&
        <>
          <TrayButton onClick={deleteMessage} data-testid='deleteButton'>{t('buttons.delete_message')}</TrayButton>
          <TrayButton onClick={muteUser} data-testid='muteButton'>{t('buttons.mute_user')}</TrayButton>
        </>
      }
      { chatPermissions &&
        <TrayButton onClick={directChat} data-testid='directChatButton'>{t('buttons.direct_chat')}</TrayButton>
      }
    </Wrapper>
  );
};

export default React.memo < MessageTrayPropsType > (MessageTray);
