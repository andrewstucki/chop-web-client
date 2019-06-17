// @flow
import * as React from 'react';
import SmallLayout from './layouts/small';
import MediumLayout from './layouts/medium';
import LargeLayout from './layouts/large';
import XlargeLayout from './layouts/xlarge';
import { Small, Medium, Large, Xlarge } from '../util/responsive';
import { Wrapper } from './styles';
import { useTranslation } from 'react-i18next';
import { getResetToken } from '../io/resetToken';

type ChopContainerProps = {
  resetPassword: (resetToken: string) => void,
  organization: string,
  hasVideo: boolean,
};

const ChopContainer = ({ resetPassword, organization, hasVideo }: ChopContainerProps) => {
  const { t } = useTranslation();
  document.title = `${t('live')} ${organization}`;
  const resetToken = getResetToken();
  if (resetToken) {
    resetPassword(resetToken);
  }

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
};

export default React.memo < ChopContainerProps > (ChopContainer);
