// @flow
import React from 'react';
import type {MomentType} from './dux';
import Message from '../components/message';
import feedStyles from './styles.css';

type FeedProps = {
  moments?: Array<MomentType>
}

const Feed = ({moments, offset}:FeedProps) => {
  let listItems = [];
  if (moments) {
    listItems = moments.map(moment => 
      <li id={moment.id} key={moment.id}>
        <Message message={moment.message} />
      </li>
    );
  }
  const translate = 'translateY(' + offset + 'px)'

  return (
    <div className={feedStyles.wrapper}>
      <ul
        style={{transform: 'translateY(' + offset + 'px)'}}
        className={feedStyles.feed}>
        {listItems}
      </ul>
    </div>
  );
};

export default Feed;
