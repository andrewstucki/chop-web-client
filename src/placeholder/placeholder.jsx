// @flow
import React from 'react';

import type { AnchorMomentType } from './anchorMoment/dux';
import { ANCHOR_MOMENT } from './anchorMoment/dux';

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
    switch (data.type) {
    case ANCHOR_MOMENT:
      return (
        <AnchorMoment
          anchorMoment={data}
          releaseAnchorMoment={releaseAnchorMoment}
        />
      );
    }
  }
};

export default Placeholder;
