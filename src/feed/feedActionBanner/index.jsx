// @flow
import React from 'react';

import type { FeedActionBannerType } from './dux';

import styles from './style.css';

const FeedActionBanner = (
  { text, action }: FeedActionBannerType
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
