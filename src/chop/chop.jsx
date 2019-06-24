// @flow
import * as React from 'react';
import SmallLayout from './layouts/small';
import MediumLayout from './layouts/medium';
import LargeLayout from './layouts/large';
import XlargeLayout from './layouts/xlarge';
import { Small, Medium, MediumUp, Large, Xlarge } from '../util/responsive';
import { Wrapper } from './styles';
import { useTranslation } from 'react-i18next';
import { getResetToken } from '../io/resetToken';

type ChopContainerProps = {
  resetPassword: (resetToken: string) => void,
  organization: string,
  hasVideo: boolean,
  isHost: boolean,
};

const ChopContainer = ({ resetPassword, organization, hasVideo, isHost }: ChopContainerProps) => {
  const { t } = useTranslation();
  document.title = `${t('live')} ${organization}`;
  const resetToken = getResetToken();
  if (resetToken) {
    resetPassword(resetToken);
  }

  if (isHost) {
    return (
      <Wrapper id="wrapper" data-testid="chop">
        <Small>
          <SmallLayout />
        </Small>
        <Medium>
          <MediumLayout hasVideo={hasVideo} />
        </Medium>
        <Large>
          <LargeLayout hasVideo={hasVideo} />
        </Large>
        <Xlarge>
          <XlargeLayout hasVideo={hasVideo} />
        </Xlarge>
      </Wrapper>
    );
  } else {
    return (
      <Wrapper id="wrapper" data-testid="chop">
        <Small>
          <SmallLayout />
        </Small>
        <MediumUp>
          <MediumLayout hasVideo={hasVideo}/>
        </MediumUp>
      </Wrapper>
    );
  }
};

export default React.memo < ChopContainerProps > (ChopContainer);
