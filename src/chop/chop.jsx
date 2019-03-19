// @flow
import * as React from 'react';
import SmallLayout from './layouts/small';
import MediumLayout from './layouts/medium';
import MediumPlusLayout from './layouts/mediumPlus';
import { Redirect } from 'react-router-dom';
import { Small, Medium, MediumPlusUp } from '../util/responsive';
import { Wrapper } from './styles';

type ChopContainerProps = {
  organization: string,
  authenticated: boolean,
};

const ChopContainer = ({organization, authenticated}: ChopContainerProps) => {
  document.title = `Live ${organization}`;

  if (authenticated) {
    return (
      <Wrapper id="wrapper" data-testid="chop">
        <Small>
          <SmallLayout />
        </Small>
        <Medium>
          <MediumLayout />
        </Medium>
        <MediumPlusUp>
          <MediumPlusLayout />
        </MediumPlusUp>
      </Wrapper>
    );
  } else {
    return (
      <Redirect to='/login'/>
    );
  }
};


export default React.memo < ChopContainerProps > (ChopContainer);
