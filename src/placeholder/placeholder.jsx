// @flow
import React from 'react';

import type { AnchorMomentType } from './anchorMoment/dux';

import AnchorMoment from './anchorMoment';

type PlaceholderPropsType = {
  anchorMoment: AnchorMomentType,
  isPlaceholderPresent: boolean,
  releaseAnchorMoment: () => void,
  currentChannel: string,
  anchorMomentAnchored: boolean,
};

const Placeholder = (
  {
    anchorMoment,
    isPlaceholderPresent,
    releaseAnchorMoment,
    currentChannel,
    anchorMomentAnchored,
  }: PlaceholderPropsType
) => {
  if (isPlaceholderPresent && currentChannel === 'host') {
    return (
      <AnchorMoment
        anchorMoment={anchorMoment}
        anchorMomentAnchored={anchorMomentAnchored}
        releaseAnchorMoment={releaseAnchorMoment}
      />
    );
  }
  return null;
};

export default Placeholder;
