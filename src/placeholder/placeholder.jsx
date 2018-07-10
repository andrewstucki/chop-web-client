// @flow
import React from 'react';

import type { AnchorMomentType } from './anchorMoment/dux';

import AnchorMoment from './anchorMoment';

type PlaceholderPropsType = {
  anchorMoment: AnchorMomentType,
  renderPlaceholder: boolean,
  releaseAnchorMoment: () => void,
};

const Placeholder = (
  {
    anchorMoment,
    renderPlaceholder,
    releaseAnchorMoment,
  }: PlaceholderPropsType
) => {
  if (renderPlaceholder) {
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
