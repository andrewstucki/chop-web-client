// @flow
/* global React$Node */
import React from 'react';

import styles from './style.css';

type PopUpModalPropsType = {
  children?: React$Node | Array<React$Node>,
  actionOneDescription: string,
  actionTwoDescription: string,
  actionOne: () => void,
  actionTwo: () => void,
};

const PopUpModal = (
  {
    actionOneDescription,
    actionTwoDescription,
    actionOne,
    actionTwo,
    children,
  }: PopUpModalPropsType
) => (
  <div className={styles.popUpModal}>
    <div className={styles.alert}>
      <div className={styles.children}>
        {children}
      </div>
      <div className={styles.actionContainer}>
        <button
          className={styles.action}
          onClick={actionOne}
        >
          {actionOneDescription}
        </button>
        <button
          className={styles.action}
          onClick={actionTwo}
        >
          {actionTwoDescription}
        </button>
      </div>
    </div>
  </div>
);

export default PopUpModal;
