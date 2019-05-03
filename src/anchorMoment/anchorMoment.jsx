// @flow
import React from 'react';
import ReleaseAnchorButton from '../../assets/release-anchor-button.svg';
import { SALVATION } from './dux';
import type { AnchorMomentType } from './dux';
import { Wrapper, ReleaseButton, Text, SubText, MomentWrapper } from './styles';
import { useTranslation } from 'react-i18next';

type AnchorMomentPropsType = {
  anchorMoment: AnchorMomentType,
  isAnchorMomentAnchored: boolean,
  releaseAnchorMoment: (channel:string, id:string) => void,
  currentChannel: string,
  salvations: number,
};

type SalvationMomentPropsType = {
  salvations: number,
};

const SalvationMoment = ({salvations}: SalvationMomentPropsType) => {
  const { t } = useTranslation('moments');
  return (
    <div>
      <Text data-testid='salvationText'>{t('salvation.text')}</Text>
      <SubText data-testid='salvationHands'>{t('salvation.hands_raised', {count: salvations})}</SubText>
    </div>
  );
};

const getAnchorMoment = (anchorMoment:AnchorMomentType, salvations:number) => {
  switch (anchorMoment.anchorMomentType) {
    case SALVATION:
      return <SalvationMoment salvations={salvations}/>;
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
) => {
  const callReleaseAnchorMoment = () => {
    releaseAnchorMoment(currentChannel, anchorMoment.id);
  };

  return (
    <Wrapper anchored={isAnchorMomentAnchored}>
      {
        isAnchorMomentAnchored &&
            <ReleaseButton
              data-testid='releaseAnchorMoment'
              dangerouslySetInnerHTML={{ __html: ReleaseAnchorButton }}
              onClick={callReleaseAnchorMoment}
            />
      }
      <MomentWrapper>
        {getAnchorMoment(anchorMoment, salvations)}
      </MomentWrapper>
    </Wrapper>
  );
};

export default AnchorMoment;
