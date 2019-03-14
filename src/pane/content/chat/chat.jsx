// @flow
import styles from './styles.css';
import React from 'react';
import Feed from '../../../feed';
import ChatInputBox from '../../../chat';
import ReactionsContainer from '../../../reactions/reactionsContainer';
import PaneHeader from '../../../paneHeader';
import { CHAT_HEADER } from '../../../paneHeader/chatHeader';
import { DIRECT_CHAT_HEADER } from '../../../paneHeader/directChatHeader';
import { MediumUp } from '../../../util/responsive';

type ChatPropsType = {
  channel: string,
  name: string,
  userCount?: number,
  isDirect: boolean,
  leaveChannel: () => void,
  otherUsersName: string,
};

const Chat = ({channel, name, userCount, isDirect, leaveChannel, otherUsersName}:ChatPropsType) => (
  <>
    {
      isDirect ?
        <PaneHeader type={DIRECT_CHAT_HEADER} data={{
          otherUsersName,
          leaveChannel,
        }} />
        :
        <MediumUp>
          <PaneHeader type={CHAT_HEADER} data={{
            title: `${name} chat`,
            subtitle: userCount,
          }} />
        </MediumUp>
    }
    <Feed key={channel} channel={channel} />
    <div className={styles.inputs}>
      <ChatInputBox channel={channel} />
      <ReactionsContainer />
    </div>
  </>
);

export default React.memo < ChatPropsType > (Chat);
