// @flow
import React from 'react';

import type { MessageType } from './dux';
import type { SharedUserType } from '../../users/dux';
import Avatar from '../../avatar';

import MessageTray from '../../components/messageTray';
import Actionable from '../../components/Actionable';
import linkifyHtml from 'linkifyjs/html';
import { sanitizeString, getFirstWordInName } from '../../util';
import Label from '../../components/label';

import { MessageWrapper, Wrapper, BodyWrapper, NameWrapper, TextWrapper, ActionableWrapper } from './styles';

type MessagePropsType = {
  message: MessageType,
  currentChannel: string,
  isCompact: boolean,
  chatPermissions: boolean,
  moderationPermissions: boolean,
  toggleMessageTray: (channel: string, id: string) => void,
  deleteMessage: (id: string, channel: string) => void,
  publishDeleteMessage: (id: string) => void,
  muteUser: (user: string) => void,
  addPlaceholderChannel: (otherUser: SharedUserType) => string,
  setPaneToChat: (channelId: string) => void,
};

const Message = (
  props: MessagePropsType
) => {
  const {
    message: {
      sender,
      messageTrayOpen,
      text,
      id:messageId,
    },
    currentChannel,
    isCompact,
    chatPermissions,
    moderationPermissions,
  } = props;

  const { name: senderName, role: { label: senderLabel } = {} } = sender;
  const renderText = linkifyHtml(text, { target: '_blank' });

  const toggleMessageTray = () => props.toggleMessageTray(currentChannel, messageId);
  const deleteMessage = () => {
    props.publishDeleteMessage(messageId);
    props.deleteMessage(messageId, currentChannel);
  };
  const muteUser = () => {
    props.muteUser(senderName);
    toggleMessageTray();
  };
  const addPlaceholderChannel = () => {
    const channelId = props.addPlaceholderChannel(sender);
    props.setPaneToChat(channelId);
    toggleMessageTray();
  };

  const hasPermissions = chatPermissions || moderationPermissions;

  const MessageBody = () => (
    <>
      <Avatar user={sender} small={isCompact}/>
      <BodyWrapper>
        <NameWrapper isCompact={isCompact}>{isCompact ? getFirstWordInName(senderName) : senderName}</NameWrapper>
        {senderLabel &&
          <Label text={senderLabel} />
        }
        <TextWrapper key={messageId} data-node='text' dangerouslySetInnerHTML={{ __html: sanitizeString(renderText) }} isCompact={isCompact} />
      </BodyWrapper>
    </>
  );

  if (hasPermissions) {
    return (
      <Wrapper data-testid='messageContainer' hasPermissions={hasPermissions}>
        <Actionable onClick={toggleMessageTray} keepFocus={true} tabable={false}>
          <ActionableWrapper messageTrayOpen={messageTrayOpen} isCompact={isCompact}>
            <MessageWrapper isCompact={isCompact}>
              <MessageBody />
            </MessageWrapper>
            <MessageTray
              messageTrayOpen={messageTrayOpen}
              isCompact={isCompact}
              deleteMessage={deleteMessage}
              muteUser={muteUser}
              directChat={addPlaceholderChannel}
              chatPermissions={chatPermissions}
              moderationPermissions={moderationPermissions}
            />
          </ActionableWrapper>
        </Actionable>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper data-testid='messageContainer' hasPermissions={hasPermissions}>
        <MessageWrapper isCompact={isCompact}>
          <MessageBody />
        </MessageWrapper>
      </Wrapper>
    );
  }
};

export default React.memo < MessagePropsType > (Message);
