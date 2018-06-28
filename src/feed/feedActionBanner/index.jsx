// @flow
import React from 'react';
import styles from './style.css';

type FeedActionBannerPropsType = {
  text: string,
  action: () => void,
};

const FeedActionBanner = (
  {
    text,
    action,
  }: FeedActionBannerPropsType
) => (
  <div className={styles.feedActionBanner}>
    <button 
      className={styles.action}
      onClick={action}
    >
      {text}
    </button>
  </div>
);

export default FeedActionBanner;
