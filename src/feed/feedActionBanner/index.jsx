// @flow
import React from 'react';

import styles from './style.css';

type FeedActionBannerPropsType = {
  text: string,
  togglePopUpModal: (isPopUpModalVisible: boolean) => void,
  isPopUpModalVisible: boolean,
};

const FeedActionBanner = (
  {
    text,
    togglePopUpModal,
    isPopUpModalVisible,
  }: FeedActionBannerPropsType
) => (
  <div className={styles.feedActionBanner}>
    <button 
      className={styles.action}
      onClick={
        () => (togglePopUpModal(isPopUpModalVisible))
      }
    >
      {text}
    </button>
  </div>
);

export default FeedActionBanner;
