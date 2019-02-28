// @flow
import styles from '../../../chop/styles.css';
import React from 'react';
import Feed from '../../../feed';
import ChatInputBox from '../../../chat';
import ReactionsContainer from '../../../reactions/reactionsContainer';

type ChatPropsType = {
  channel: string,
};

const Chat = ({channel}:ChatPropsType) => (
  <>
    <Feed key={channel} channel={channel} />
    <div className={styles.inputs}>
      <ChatInputBox channel={channel} />
      <ReactionsContainer />
    </div>
  </>
);

Chat.whyDidYouRender = true;

export default React.memo < ChatPropsType > (Chat);
