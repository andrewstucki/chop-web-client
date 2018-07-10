// @flow
import React from 'react';

import type { AnchorMomentType } from './dux';

import ReleaseAnchorButton from '../../../assets/release-anchor-button.svg';
import styles from './style.css';

type AnchorMomentPropsType = {
  anchorMoment: AnchorMomentType,
  releaseAnchorMoment?: () => void,
};

const AnchorMoment = (
  {
    anchorMoment,
    releaseAnchorMoment,
  }: AnchorMomentPropsType
) => {
  const textContainerStyle =
    anchorMoment.showReleaseAnchorButton ? styles.withButton : styles.withoutButton;
    // KENNY flow was unhappy about about the optional action here so I ran FlowFixMe
    // Let me know if there is a better way to handle this
  return (
    <div className={styles.anchorMoment}>
      {
        anchorMoment.showReleaseAnchorButton &&
          <button
            className={styles.releaseAnchorButton}
            dangerouslySetInnerHTML={{ __html: ReleaseAnchorButton }}
            onClick={() => {
              // $FlowFixMe
              releaseAnchorMoment();
            }}
          />
      }
      <div className={textContainerStyle}>
        <div className={styles.text}>
          {anchorMoment.text}
        </div>
        <div className={styles.subText}>
          {anchorMoment.subText}
        </div>
      </div>
    </div>
  );
};

export default AnchorMoment;
