// @flow
import React from 'react';

import ReleaseAnchorButton from '../../../assets/release-anchor-button.svg';
import styles from './style.css';

type AnchorMomentPropsType = {
  text: string,
  raisedHandCount: string,
  showReleaseButton: boolean,
  releaseAnchorMoment: () => void,
};

const AnchorMoment = (
  {
    text,
    raisedHandCount,
    showReleaseButton,
    releaseAnchorMoment,
  }: AnchorMomentPropsType
) => {
  const renderRaisedHandText = () => {
    if (raisedHandCount === "1") {
      return 'hand raised';
    }
    return 'hands raised';
  };

  return (
    <div className={styles.anchorMoment}>
      {
        showReleaseButton &&
          <button
            className={styles.releaseAnchorButton}
            dangerouslySetInnerHTML={{ __html: ReleaseAnchorButton }}
            onClick={releaseAnchorMoment}
          />
      }
      <div className={styles.text}>
        {text}
      </div>
      <div className={styles.raisedHandCount}>
        {raisedHandCount} {renderRaisedHandText()}
      </div>
    </div>
  );
};

export default AnchorMoment;
