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
import { useTranslation, Trans } from 'react-i18next';
import LivePrayerButton from '../../../components/livePrayerButton';

type ChatPropsType = {
  channel: string,
  type: string,
  subscriberCount?: number,
  isDirect: boolean,
  isPlaceholder: boolean,
  leaveChannel: () => void,
  otherSubscribersName: string,
  hideReactions: boolean,
  pendingPrayer: boolean,
  isHost: boolean,
};

const Chat = (props:ChatPropsType) => (
  <>
    { props.type === 'public' && !props.isHost &&
      <LivePrayerButton />
    }
    <ChatFeed {...props} />
    <ChatInputs>
      <ChatInputBox channel={props.channel} hideReactions={props.hideReactions} pendingPrayer={props.pendingPrayer}/>
      {!props.hideReactions &&
        <ReactionsContainer/>
      }
    </ChatInputs>
  </>
);

const ChatFeed = React.memo < ChatPropsType > (
  function ChatFeed ({ otherSubscribersName, isDirect, leaveChannel, type, subscriberCount, channel, isPlaceholder, pendingPrayer }: ChatPropsType) {
    const { t } = useTranslation();
    const directChatHeaderData = {
      otherSubscribersName,
      leaveChannel,
    };
    const chatHeaderData:ChatHeaderProps = {
      title: `${t(type)} ${t('chat')}`,
      subtitle: subscriberCount,
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
          isPlaceholder || pendingPrayer ? <ChatPlaceholder otherSubscribersName={otherSubscribersName} pendingPrayer={pendingPrayer} /> : <Feed key={channel} channel={channel}/>
        }
      </>
    );
  }
);
ChatFeed.displayName = 'ChatFeed';

type ChatPlaceholderProps = {
  otherSubscribersName: string,
  pendingPrayer: boolean,
};

const ChatPlaceholder = React.memo < ChatPlaceholderProps > (
  function ChatPlaceholder ({ otherSubscribersName, pendingPrayer }: ChatPlaceholderProps) {
    const { t } = useTranslation('common');
    return (
      <PlaceholderWrapper>
        <CommentOutline />
        { pendingPrayer ?
          <PlaceholderText>
            { t('prayer_pending') }
          </PlaceholderText> :
          <PlaceholderText>
            <Trans i18nKey='channel_pending'>
              {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
              Start chatting with <strong>{{nickname:otherSubscribersName}}</strong>.
            </Trans>
          </PlaceholderText>

        }
      </PlaceholderWrapper>
    );
  }
);
ChatPlaceholder.displayName = 'ChatPlaceholder';

export default React.memo < ChatPropsType > (Chat);
