// @flow
import React from 'react';

import type { MessageType } from './dux';
import type { SharedSubscriberType } from '../../subscriber/dux';
import Avatar from '../../avatar';

import MessageTray from '../../components/messageTray';
import Actionable from '../../components/Actionable';
import linkifyHtml from 'linkifyjs/html';
import { sanitizeString } from '../../util';
import SenderName from '../senderName';
import { MessageWrapper, Wrapper, BodyWrapper, TextWrapper, ActionableWrapper } from './styles';

type MessagePropsType = {
  message: MessageType,
  currentChannel: string,
  isCompact: boolean,
  chatPermissions: boolean,
  moderationPermissions: boolean,
  toggleMessageTray: (channel: string, id: string) => void,
  deleteMessage: (id: string, channel: string) => void,
  publishDeleteMessage: (id: string) => void,
  muteSubscriber: (subscriber: string, currentChannel: string) => void,
  addPlaceholderChannel: (otherSubscriber: SharedSubscriberType) => string,
  setPaneToChat: (channelId: string) => void,
};

const Message = (
  props: MessagePropsType
) => {
  const {
    message: {
      subscriber,
      messageTrayOpen,
      text,
      id:messageId,
    },
    currentChannel,
    isCompact,
    chatPermissions,
    moderationPermissions,
  } = props;

  const { nickname: subscriberName, role: { label: subscriberLabel } = {} } = subscriber;
  const renderText = linkifyHtml(text, { target: '_blank' });

  const toggleMessageTray = () => props.toggleMessageTray(currentChannel, messageId);
  const deleteMessage = () => {
    props.publishDeleteMessage(messageId);
    props.deleteMessage(messageId, currentChannel);
  };
  const muteSubscriber = () => {
    props.muteSubscriber(subscriberName, currentChannel);
  };
  const addPlaceholderChannel = () => {
    const channelId = props.addPlaceholderChannel(subscriber);
    props.setPaneToChat(channelId);
  };

  const hasPermissions = chatPermissions || moderationPermissions;
  const avatarSize = isCompact ? 'small' : 'medium';
  const MessageBody = () => (
    <>
      <Avatar subscriber={subscriber} size={avatarSize} />
      <BodyWrapper>
        <SenderName isCompact={isCompact} name={subscriberName} label={subscriberLabel}/>
        <TextWrapper key={messageId} data-node='text' dangerouslySetInnerHTML={{ __html: sanitizeString(renderText) }} isCompact={isCompact} />
      </BodyWrapper>
    </>
  );

  if (hasPermissions) {
    return (
      <Wrapper data-testid='messageContainer' hasPermissions={hasPermissions}>
        <Actionable onClick={toggleMessageTray} keepFocus={true} tabable={false} data-testid='messageContainer-actionable'>
          <ActionableWrapper messageTrayOpen={messageTrayOpen} isCompact={isCompact} data-testid='message-actionable'>
            <MessageWrapper isCompact={isCompact}>
              <MessageBody />
            </MessageWrapper>
            <MessageTray
              messageTrayOpen={messageTrayOpen}
              isCompact={isCompact}
              deleteMessage={deleteMessage}
              muteSubscriber={muteSubscriber}
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
