import styles from '../../../chop/styles.css';
import React from 'react';
import Feed from '../../../feed';
import ChatInputBox from '../../../chat';
import ReactionsContainer from '../../../reactions/reactionsContainer';

const Chat = ({channel}) => (
  <React.Fragment>
    <Feed key={channel} channel={channel} />
    <div className={styles.inputs}>
      <ChatInputBox channel={channel} />
      <ReactionsContainer />
    </div>
  </React.Fragment>
);

export default Chat;
