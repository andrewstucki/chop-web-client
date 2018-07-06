// @flow
import React from 'react';

import type { AnchorMomentType } from './anchorMoment/dux';
import { CALL_TO_CHRIST } from './anchorMoment/dux';

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
    case CALL_TO_CHRIST:
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
