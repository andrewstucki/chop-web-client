// @flow
import React from 'react';

import type { AnchorMomentType } from './dux';

import ReleaseAnchorButton from '../../../assets/release-anchor-button.svg';
import styles from './style.css';

type AnchorMomentPropsType = {
  anchorMoment: AnchorMomentType,
  anchorMomentAnchored: boolean,
  releaseAnchorMoment?: () => void,
};

const AnchorMoment = (
  {
    anchorMoment,
    anchorMomentAnchored,
    releaseAnchorMoment,
  }: AnchorMomentPropsType
) => {
  const { text, subText } = anchorMoment;
  const anchorMomentStyle =
    anchorMomentAnchored ? styles.anchored : styles.released;

  const textContainerStyle =
    anchorMomentAnchored ? styles.withButton : styles.withoutButton;

    // KENNY flow was unhappy about about the optional action here so I ran FlowFixMe
    // Let me know if there is a better way to handle this
  return (
    <div className={anchorMomentStyle}>
      {
        anchorMomentAnchored &&
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
          {text}
        </div>
        <div className={styles.subText}>
          {subText}
        </div>
      </div>
    </div>
  );
};

export default AnchorMoment;
