// @flow
import * as React from 'react';
import { Redirect } from 'react-router-dom';
import MediaQuery from 'react-responsive';
import Small from './layouts/small';
import Medium from './layouts/medium';
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
        <MediaQuery maxWidth={639}>
          <Small/>
        </MediaQuery>
        <MediaQuery minWidth={640}>
          <Medium/>
        </MediaQuery>
      </Wrapper>
    );
  } else {
    return (
      <Redirect to='/login'/>
    );
  }
};


export default React.memo < ChopContainerProps > (ChopContainer);
