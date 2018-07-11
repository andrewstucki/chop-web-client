// @flow
import React from 'react';

import type { AnchorMomentType } from './anchorMoment/dux';

import AnchorMoment from './anchorMoment';

type PlaceholderPropsType = {
  anchorMoment: AnchorMomentType,
  renderPlaceholder: boolean,
  releaseAnchorMoment: () => void,
  currentChannel: string,
};

const Placeholder = (
  {
    anchorMoment,
    renderPlaceholder,
    releaseAnchorMoment,
    currentChannel,
  }: PlaceholderPropsType
) => {
  if (renderPlaceholder && currentChannel === 'host') {
    return (
      <AnchorMoment
        anchorMoment={anchorMoment}
        releaseAnchorMoment={releaseAnchorMoment}
      />
    );
  }
  return null;
};

export default Placeholder;
