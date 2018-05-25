// @flow
import React from 'react';
import styles from './style.css';

type MessagePropsType = {
  id: string,
  message: string
};

const Message = ({ id, message }: MessagePropsType) => (
  <div id={id} className={styles.wrapper}>
    <div className={styles.icon}>B</div>
    <div className={styles.body}>
      <strong className={styles.name}>Billy Bob</strong>
      <span className={styles.role}>Host</span>
      <div>{message}</div>
    </div>
  </div>
);

export default Message;
