// @flow
import React from 'react';
import type { SharedUserType } from '../feed/dux';

import HeartButton from '../../assets/heart-button.svg';
import styles from './style.css';

type ReactionButtonPropsType = {
  buttonClick: (currentUser: SharedUserType) => void,
  currentUser: SharedUserType
}

const ReactionButton = ({ buttonClick, currentUser }: ReactionButtonPropsType) => (
  <div className={styles.container}>
    <button
      onClick={() => buttonClick(currentUser)}
      className={styles.reactionButton}
      dangerouslySetInnerHTML={{ __html: HeartButton }}
    />
  </div>
);

export default ReactionButton;
