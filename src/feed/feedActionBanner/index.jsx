// @flow
import React from 'react';

import styles from './style.css';

type FeedActionBannerPropsType = {
  text: string,
  togglePopUpModal: () => void,
};

const FeedActionBanner = (
  {
    text,
    togglePopUpModal,
  }: FeedActionBannerPropsType
) => (
  <div className={styles.feedActionBanner}>
    <button 
      className={styles.action}
      onClick={
        () => (togglePopUpModal())
      }
    >
      {text}
    </button>
  </div>
);

export default FeedActionBanner;
