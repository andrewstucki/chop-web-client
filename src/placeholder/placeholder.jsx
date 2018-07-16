// @flow
import React from 'react';

import type { AnchorMomentType } from './anchorMoment/dux';

import AnchorMoment from './anchorMoment';

type PlaceholderPropsType = {
  anchorMoment: AnchorMomentType,
  renderPlaceholder: boolean,
  releaseAnchorMoment: () => void,
  currentChannel: string,
  anchorMomentAnchored: boolean,
};

const Placeholder = (
  {
    anchorMoment,
    renderPlaceholder,
    releaseAnchorMoment,
    currentChannel,
    anchorMomentAnchored,
  }: PlaceholderPropsType
) => {
  if (renderPlaceholder && currentChannel === 'host') {
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
