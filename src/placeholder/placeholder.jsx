// @flow
import React from 'react';

import type { AnchorMomentType } from './anchorMoment/dux';

import AnchorMoment from './anchorMoment';

type PlaceHolderPropsType = {
  data: AnchorMomentType,
  renderPlaceholder: boolean,
  releaseAnchorMoment: () => void,
};

const Placeholder = (
  {
    data,
    renderPlaceholder,
    releaseAnchorMoment,
  }: PlaceHolderPropsType
) => {
  if (renderPlaceholder) {
    return (
      <AnchorMoment
        anchorMoment={data}
        releaseAnchorMoment={releaseAnchorMoment}
      />
    );
  }
};

export default Placeholder;
