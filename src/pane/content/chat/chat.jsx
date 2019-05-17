// @flow
import React from 'react';
import Feed from '../../../feed';
import ChatInputBox from '../../../chat';
import ReactionsContainer from '../../../reactions/reactionsContainer';
import PaneHeader from '../../../paneHeader';
import CommentOutline from '../../../icons/commentOutline';
import { CHAT_HEADER, type ChatHeaderProps } from '../../../paneHeader/chatHeader';
import { DIRECT_CHAT_HEADER } from '../../../paneHeader/directChatHeader';
import { MediumUp } from '../../../util/responsive';
import { ChatInputs, PlaceholderWrapper, PlaceholderText } from './styles';
import { useTranslation } from 'react-i18next';

type ChatPropsType = {
  channel: string,
  type: string,
  userCount?: number,
  isDirect: boolean,
  isPlaceholder: boolean,
  leaveChannel: () => void,
  otherUsersName: string,
  hideReactions: boolean,
};

const Chat = (props:ChatPropsType) => (
  <>
    <ChatFeed {...props} />
    <ChatInputs>
      <ChatInputBox channel={props.channel} hideReactions={props.hideReactions} />
      {!props.hideReactions &&
        <ReactionsContainer/>
      }
    </ChatInputs>
  </>
);

const ChatFeed = React.memo < ChatPropsType > (
  function ChatFeed ({ otherUsersName, isDirect, leaveChannel, type, userCount, channel, isPlaceholder }: ChatPropsType) {
    const { t } = useTranslation();
    const directChatHeaderData = {
      otherUsersName,
      leaveChannel,
    };
    const chatHeaderData:ChatHeaderProps = {
      title: `${t(type)} ${t('chat')}`,
      subtitle: userCount,
    };

    return (
      <>
        {
          (isDirect || isPlaceholder) ?
            <PaneHeader type={DIRECT_CHAT_HEADER} data={directChatHeaderData}/>
            :
            <MediumUp>
              <PaneHeader type={CHAT_HEADER} data={chatHeaderData}/>
            </MediumUp>
        }
        {
          isPlaceholder ? <ChatPlaceholder otherUsersName={otherUsersName} /> : <Feed key={channel} channel={channel}/>
        }
      </>
    );
  }
);

type ChatPlaceholderProps = {
  otherUsersName: string,
};

const ChatPlaceholder = React.memo < ChatPlaceholderProps > (
  function ChatPlaceholder ({ otherUsersName }: ChatPlaceholderProps) {
    return (
      <PlaceholderWrapper>
        <CommentOutline />
        <PlaceholderText>Start chatting with <strong>{otherUsersName}</strong>.</PlaceholderText>
      </PlaceholderWrapper>
    );
  }
);

export default React.memo < ChatPropsType > (Chat);
