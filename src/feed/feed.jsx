// @flow
import React from 'react';
import type {MomentType} from './dux';
import Message from '../components/message';
import feedStyles from './styles.css';

type FeedProps = {
  moments?: Array<MomentType>,
  offset: number,
  onMessageRender: (offset: number) => void,
  channel: string,
};

const Feed = ({moments, offset, onMessageRender, channel}:FeedProps) => {
  let listItems = [];
  if (moments) {
    listItems = moments.map(moment => 
      <li key={moment.id}>
        <Message id={moment.id} message={moment.message} onMount={onMessageRender} neverRendered={moment.neverRendered} />
      </li>
    );
  }

  return (
    <div className={feedStyles.wrapper}>
      <ul
        key={channel}
        style={{transform: 'translateY(' + offset + 'px)'}}
        className={feedStyles.feed}>
        {listItems}
      </ul>
    </div>
  );
};

export default Feed;