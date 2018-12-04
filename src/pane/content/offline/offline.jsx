// @flow
import React from 'react';
import styles from './styles.css';

type OfflinePropsType = {
  eventName: string,
  eventTime: string
};

const Offline =
(
  {
    eventName,
    eventTime,
  }: OfflinePropsType
) => (
  <div className={styles.offline}>
    <div>
      <p className={styles.heading}>Upcoming Event</p>
      <p className={styles.eventName}>{eventName}</p>
      <p className={styles.eventTime}>{eventTime}</p>
    </div>
  </div>
);

export default Offline;
