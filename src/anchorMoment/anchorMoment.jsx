// @flow
import React from 'react';

import ReleaseAnchorButton from '../../assets/release-anchor-button.svg';

import {
  SALVATION,
} from './dux';

import type {
  SalvationType,
  AnchorMomentType,
} from './dux';

import { Wrapper, ReleaseButton, Text, SubText, MomentWrapper } from './styles';

type AnchorMomentPropsType = {
  anchorMoment: AnchorMomentType,
  isAnchorMomentAnchored: boolean,
  releaseAnchorMoment: (channel:string, id:string) => void,
  currentChannel: string,
  salvations: number,
};

const salvationMoment = (
  {
    text,
  }: SalvationType,
  salvations,
) => (
  <div>
    <Text>
      {text}
    </Text>
    <SubText>
      {salvations === 1 ? `${salvations} hand raised` : `${salvations} hands raised`}
    </SubText>
  </div>
);

const getAnchorMoment = (anchorMoment, salvations) => {
  switch (anchorMoment.anchorMomentType) {
    case SALVATION:
      return salvationMoment(anchorMoment, salvations);
  }
};

const AnchorMoment = (
  {
    anchorMoment,
    isAnchorMomentAnchored,
    releaseAnchorMoment,
    currentChannel,
    salvations,
  }: AnchorMomentPropsType
) => (
  <Wrapper anchored={isAnchorMomentAnchored}>
    {
      isAnchorMomentAnchored &&
          <ReleaseButton
            dangerouslySetInnerHTML={{ __html: ReleaseAnchorButton }}
            onClick={() => {
              // $FlowFixMe
              releaseAnchorMoment(currentChannel, anchorMoment.id);
            }}
          />
    }
    <MomentWrapper>
      {getAnchorMoment(anchorMoment, salvations)}
    </MomentWrapper>
  </Wrapper>
);

export default React.memo < AnchorMomentPropsType > (AnchorMoment);
