// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import type {MomentType} from './dux';
import Message from '../components/message';
import styles from './styles.css';

type FeedProps = {
  moments?: Array<MomentType>,
  channel: string,
  appendingMessage: boolean,
  trayButtonOnClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
};

const Feed = ({ moments, channel, appendingMessage, trayButtonOnClick }:FeedProps) => {
  let listItems = [];
  if (moments) {
    listItems = moments.map((moment, index) => {
      const appendMessage = appendingMessage && index === moments.length - 1;
      return (
        <li key={moment.id}>
          <Message
            message={moment}
            appendingMessage={appendMessage}
            trayButtonOnClick={trayButtonOnClick}
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
