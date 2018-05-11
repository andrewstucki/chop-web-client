// @flow
import React from 'react';
import type {MomentType} from './dux';
import feedStyles from './styles.css';
type FeedProps = {
  moments?: Array<MomentType>
}

const Feed = ({moments}:FeedProps) => {
  let listItems = [];
  if (moments) {
    listItems = moments.map(moment => 
      <li key={moment.id}>{moment.message}</li>
    );
  }

  return (
    <ul className={feedStyles.feed}>
      {listItems}
    </ul>
  );
};

export default Feed;
