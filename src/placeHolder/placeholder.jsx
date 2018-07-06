// @flow
import React from 'react';

import type { AnchorMomentType } from './dux';
import { CALL_TO_CHRIST } from './dux';

import AnchorMoment from './anchorMoment';
import styles from './style.css';

type PlaceHolderPropsType = {
  data: AnchorMomentType,
  renderPlaceholder: boolean,
  raisedHandCount: number,
};

const Placeholder = (
  {
    data,
    renderPlaceholder,
    raisedHandCount,
  }: PlaceHolderPropsType
) => {
  const placeholderStyle =
    renderPlaceholder ? styles.showPlaceholder : styles.hidePlaceholder;

  const getPlaceholderContent = () => {
    switch (data.type) {
      case CALL_TO_CHRIST:
        return (
          <AnchorMoment
            anchorMoment={data}
            raisedHandCount={raisedHandCount}
          />
        );
    };
  };

  return (
    <div className={placeholderStyle}>
      {getPlaceholderContent()}
    </div>
  );
};

export default Placeholder;
