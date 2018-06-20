// @flow
import React from 'react';

import styles from './style.css';

type PopUpModalPropsType = {
  alertText: string,
  nickname?: string,
  actionOneDescription: string,
  actionTwoDescription: string,
  actionOne: () => void,
  actionTwo: () => void,
};

const questionMarkStyle = {fontWeight: 'normal'};

const PopUpModal = (
  {
    alertText,
    nickname,
    actionOneDescription,
    actionTwoDescription,
    actionOne,
    actionTwo,
  }: PopUpModalPropsType
) => (
  <div className={styles.popUpModal}>
    <div className={styles.alert}>
      <div className={styles.alertText}>{alertText}</div>
      <strong className={styles.nickname}>
        {nickname}
        <span style={questionMarkStyle}>?</span>
      </strong>

      <div className={styles.actionContainer}>
        <button
          className={styles.actionOne}
          onClick={actionOne}
        >
          {actionOneDescription}
        </button>
        <button
          className={styles.actionTwo}
          onClick={actionTwo}
        >
          {actionTwoDescription}
        </button>
      </div>
    </div>
  </div>
);

export default PopUpModal;
