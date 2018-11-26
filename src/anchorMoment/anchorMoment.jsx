// @flow
import React from 'react';

import ReleaseAnchorButton from '../../assets/release-anchor-button.svg';

import {
  SALVATION,
} from './dux';

import type {
  SalvationType,
  AnchorMomentType,
} from './dux';

import styles from './style.css';

type AnchorMomentPropsType = {
  anchorMoment: AnchorMomentType,
  isAnchorMomentAnchored: boolean,
  releaseAnchorMoment: (channel:string, id:string) => void,
  currentChannel: string,
  salvations: number,
};

const salvationMoment = (
  {
    text,
  }: SalvationType,
  salvations,
) => (
  <div>
    <div className={styles.text}>
      {text}
    </div>
    <div className={styles.subText}>
      {salvations === 1 ? `${salvations} hand raised` : `${salvations} hands raised`}
    </div>
  </div>
);

const getAnchorMoment = (anchorMoment, salvations) => {
  switch (anchorMoment.anchorMomentType) {
  case SALVATION:
    return salvationMoment(anchorMoment, salvations);
  }
};

const AnchorMoment = (
  { 
    anchorMoment,
    isAnchorMomentAnchored,
    releaseAnchorMoment,
    currentChannel,
    salvations, 
  }: AnchorMomentPropsType
) => {
  const anchorMomentStyle =
    isAnchorMomentAnchored ? styles.anchored : styles.released;

  const textContainerStyle =
    isAnchorMomentAnchored ? styles.withButton : styles.withoutButton;

  return (
    <div className={anchorMomentStyle}>
      {
        isAnchorMomentAnchored &&
          <button
            className={styles.releaseAnchorButton}
            dangerouslySetInnerHTML={{ __html: ReleaseAnchorButton }}
            onClick={() => {
              // $FlowFixMe
              releaseAnchorMoment(currentChannel, anchorMoment.id);
            }}
          />
      }
      <div className={textContainerStyle}>
        {getAnchorMoment(anchorMoment, salvations)}
      </div>
    </div>
  );
};

export default AnchorMoment;
