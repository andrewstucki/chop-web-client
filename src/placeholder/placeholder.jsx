// @flow
import React from 'react';

import type { AnchorMomentType } from './anchorMoment/dux';

import AnchorMoment from './anchorMoment';

type PlaceholderPropsType = {
  anchorMoment: AnchorMomentType,
  isPlaceholderPresent: boolean,
  releaseAnchorMoment: () => void,
  currentChannel: string,
  isAnchorMomentAnchored: boolean,
};

const Placeholder = (
  {
    anchorMoment,
    isPlaceholderPresent,
    releaseAnchorMoment,
    currentChannel,
    isAnchorMomentAnchored,
  }: PlaceholderPropsType
) => {
  if (isPlaceholderPresent && currentChannel === 'host') {
    return (
      <AnchorMoment
        anchorMoment={anchorMoment}
        isAnchorMomentAnchored={isAnchorMomentAnchored}
        releaseAnchorMoment={releaseAnchorMoment}
      />
    );
  }
  return null;
};

export default Placeholder;
