// @flow
import React from 'react';
import type {MomentType} from './dux';
import Message from '../components/message';
import styles from './styles.css';

type FeedProps = {
  moments?: Array<MomentType>,
  channel: string,
};

const Feed = ({moments, channel}:FeedProps) => {
  let listItems = [];
  if (moments) {
    listItems = moments.map(moment => 
      <li key={moment.id}>
        <Message message={moment} />
      </li>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.overflow}>
        <ul
          id="moments"
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
