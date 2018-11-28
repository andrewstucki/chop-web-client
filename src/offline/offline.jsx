// @flow
import React from 'react';
import styles from './styles.css';

type OfflinePropsType = {
  isOffline: boolean,
  eventName: string,
  eventTime: string
};

const Offline =
(
  {
    isOffline,
    eventName,
    eventTime,
  }: OfflinePropsType
) => {
  if (isOffline) {
    return (
      <div className={styles.offline}>
        <div>
          <p className={styles.heading}>Upcoming Event</p>
          <p className={styles.eventName}>{eventName}</p>
          <p className={styles.eventTime}>{eventTime}</p>
        </div>
      </div>
    );
  } else {
    return null;
  }
};

export default Offline;
