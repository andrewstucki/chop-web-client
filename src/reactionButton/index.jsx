// @flow
import React from 'react';

import HeartButton from '../../assets/heart-button.svg';
import styles from './style.css';

const ReactionButton = () => (
  <div className={styles.container}>
    <button
      className={styles.reactionButton}
      dangerouslySetInnerHTML={{ __html: HeartButton }}
    />
  </div>
);

export default ReactionButton;
