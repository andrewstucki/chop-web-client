// @flow
import * as React from 'react';
import SmallLayout from './layouts/small';
import MediumLayout from './layouts/medium';
import LargeLayout from './layouts/large';
import XlargeLayout from './layouts/xlarge';
import { Redirect } from 'react-router-dom';
import { Small, Medium, Large, Xlarge } from '../util/responsive';
import { Wrapper } from './styles';
import { useTranslation } from 'react-i18next';

type ChopContainerProps = {
  organization: string,
  authenticated: boolean,
  hasVideo: boolean,
};

const ChopContainer = ({organization, authenticated, hasVideo }: ChopContainerProps) => {
  const { t } = useTranslation();
  document.title = `${t('live')} ${organization}`;

  if (authenticated) {
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
      <Redirect to='/login'/>
    );
  }
};


export default React.memo < ChopContainerProps > (ChopContainer);
