
import React from 'react';
import Label from '../components/label';
import { LabelWrapper } from '../components/label/styles';
import { NameWrapper } from './message/styles';
import { getFirstWordInName } from '../util';

type LabelPropsType = {
  isCompact: boolean,
  name: string,
  label?: string,
};

const SenderName = ({isCompact, name, label}:LabelPropsType) => (
    <>
      <NameWrapper isCompact={isCompact}>{isCompact ? getFirstWordInName(name) : name}</NameWrapper>
        {label !== '' && label !== undefined &&
          <LabelWrapper ><Label text={label} /></LabelWrapper>
        }
    </>
);

export default React.memo(SenderName);