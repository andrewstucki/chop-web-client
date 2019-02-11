// @flow
import React from 'react';
import type { SharedUserType } from '../../feed/dux';

import HeartButton from '../../../assets/heart-button.svg';
import styles from './style.css';
import { Actionable } from '../../components/Actionable';

type ReactionButtonPropsType = {
  buttonClick: (currentUser: SharedUserType) => void,
  currentUser: SharedUserType
}

const ReactionButton = ({ buttonClick: _click, currentUser }: ReactionButtonPropsType) => {
  const buttonClick = () => _click(currentUser);

  return (
    <div className={styles.container}>
      <Actionable onClick={buttonClick} keepFocus={true}>
        <button
          className={styles.reactionButton}
          dangerouslySetInnerHTML={{ __html: HeartButton }}
        />
      </Actionable>
    </div>
  );
};

export default ReactionButton;
