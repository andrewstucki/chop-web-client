// @flow
import React from 'react';

import type {
  FeedActionBannerType,
  LeaveDirectChatType,
  CancelDirectChatType
} from './dux';

import { removeChannel } from '../../feed/dux';
import {
  LEAVE_DIRECT_CHAT,
  CANCEL_DIRECT_CHAT,
} from './dux';

import styles from './style.css';

type FeedActionBannerPropsType = {
  data: FeedActionBannerType,
};

const leaveDirectChatBanner = (
  { channel }: LeaveDirectChatType
) => (
  <div className={styles.feedActionBanner}>
    <button 
      className={styles.action}
      onClick={
        () => (removeChannel(channel))
      }
    >
      Leave
    </button>
  </div>
);

const cancelDirectChatBanner = (
  { channel }: CancelDirectChatType
) => (
  <div className={styles.feedActionBanner}>
    <button 
      className={styles.action}
      onClick={
        () => (removeChannel(channel))
      }
    >
      Cancel
    </button>
  </div>
);

const getBannerContent = data => {
  switch (data.type) {
    case LEAVE_DIRECT_CHAT:
      return leaveDirectChatBanner(data);
    case CANCEL_DIRECT_CHAT:
      return cancelDirectChatBanner(data);
  }
};

const FeedActionBanner = (
  { data }: FeedActionBannerPropsType
) => (
  getBannerContent(data)
);

export default FeedActionBanner;
