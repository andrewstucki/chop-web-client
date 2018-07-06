// @flow
import React from 'react';

import type { AnchorMomentType, CallToChristType } from './dux';
import { CALL_TO_CHRIST } from './dux';

import ReleaseAnchorButton from '../../../assets/release-anchor-button.svg';
import styles from './style.css';

type AnchorMomentPropsType = {
  anchorMoment: AnchorMomentType,
  releaseAnchorMoment: () => void,
};

const callToChristAnchorMoment = (
  {
    text,
    subText,
    showReleaseAnchorButton,
  }: CallToChristType,
  action,
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
    <div className={styles.textContainer}>
      <div className={styles.text}>
        {text}
      </div>
      <div className={styles.subText}>
        {subText}
      </div>
    </div>
  </div>
);

const getAnchorMomentContent = (content, action) => {
  switch (content.type) {
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
