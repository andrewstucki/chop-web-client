// @flow
import React from 'react';

import type { AnchorMomentType, CallToChristType } from '../dux';
import { CALL_TO_CHRIST } from '../dux';

import ReleaseAnchorButton from '../../../assets/release-anchor-button.svg';
import styles from './style.css';

type AnchorMomentPropsType = {
  anchorMoment: AnchorMomentType,
  raisedHandCount: number,
};

const callToChristAnchorMoment = (
  {
    text,
    subText,
    action,
    showReleaseAnchorButton,
  }: CallToChristType,
  count
) => (
  <div className={styles.anchorMoment}>
    {
      showReleaseAnchorButton &&
        <button
          className={styles.releaseAnchorButton}
          dangerouslySetInnerHTML={{ __html: ReleaseAnchorButton }}
          onClick={action}
        />
    }
    <div className={styles.text}>
      {text}
    </div>
    <div className={styles.subText}>
      {count} {subText}
    </div>
  </div>
);

const getAnchorMomentContent = (anchorMoment, count) => {
  switch (anchorMoment.type) {
    case CALL_TO_CHRIST:
      return callToChristAnchorMoment(anchorMoment, count)
  }
};

const AnchorMoment = (
  {
    anchorMoment,
    raisedHandCount,
  }: AnchorMomentPropsType
) => (
  getAnchorMomentContent(anchorMoment, raisedHandCount)
);

export default AnchorMoment;
