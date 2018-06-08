// @flow
import React from 'react';
import type {MomentType} from './dux';
import Message from '../components/message';
import styles from './styles.css';

type FeedProps = {
  moments?: Array<MomentType>,
  channel: string,
  appendingMessage: boolean,
};

const Feed = ({ moments, channel, appendingMessage }:FeedProps) => {
  let listItems = [];
  if (moments) {
    listItems = moments.map((moment, index) => {
      const appendMessage = appendingMessage && index === moments.length - 1;
      return (
        <li key={moment.id}>
          <Message
            message={moment}
            appendingMessage={appendMessage}
          />
        </li>
      );
    });
  }

  return (
    <div className={styles.wrapper}>
      <div id="chat-box" className={styles.overflow}>
        <ul
          key={channel}
          className={styles.feed}
        >
          {listItems}
        </ul>
      </div>
    </div>
  );
};

export default Feed;
