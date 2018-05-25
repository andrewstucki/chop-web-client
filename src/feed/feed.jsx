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
        <Message id={moment.id} message={moment.message} />
      </li>
    );
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.overflow}>
        <ul
          key={channel}
          className={styles.feed}>
          {listItems}
        </ul>
      </div>
    </div>
  );
};

export default Feed;
