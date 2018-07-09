// @flow
import React from 'react';

import type { AnchorMomentType } from './dux';
import { CALL_TO_CHRIST } from './dux';

import ReleaseAnchorButton from '../../../assets/release-anchor-button.svg';
import styles from './style.css';

type AnchorMomentPropsType = {
  anchorMoment: AnchorMomentType,
  releaseAnchorMoment: (anchorMoment: AnchorMomentType) => void,
};

const callToChristAnchorMoment = (
  anchorMoment: AnchorMomentType,
  action,
) => (
  <div className={styles.anchorMoment}>
    {
      anchorMoment.showReleaseAnchorButton &&
        <button
          className={styles.releaseAnchorButton}
          dangerouslySetInnerHTML={{ __html: ReleaseAnchorButton }}
          onClick={
            () => {
              action(anchorMoment);
            }
          }
        />
    }
    <div className={styles.textContainer}>
      <div className={styles.text}>
        {anchorMoment.text}
      </div>
      <div className={styles.subText}>
        {anchorMoment.subText}
      </div>
    </div>
  </div>
);

const getAnchorMomentContent = (content, action) => {
  switch (content.anchorMomentType) {
  case CALL_TO_CHRIST:
    return callToChristAnchorMoment(content, action);
  }
};

const AnchorMoment = (
  {
    anchorMoment,
    releaseAnchorMoment,
  }: AnchorMomentPropsType
) => (
  getAnchorMomentContent(anchorMoment, releaseAnchorMoment)
);

export default AnchorMoment;
