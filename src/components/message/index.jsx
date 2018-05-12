// @flow
import React from 'react';
import messageStyles from './style.css';

type MessagePropsType = {
  message: string,
}

const Message = 
(
  {
    message,
  }: MessagePropsType
) => (
  <div className={messageStyles.wrapper}>
    <div className={messageStyles.icon}>B</div>
    <div className={messageStyles.body}>
      <strong className={messageStyles.name}>Billy Bob</strong>
      <span className={messageStyles.role}>Host</span>
      <div className={messageStyles.message}>{message}</div>
    </div>
  </div>
);

export default Message;