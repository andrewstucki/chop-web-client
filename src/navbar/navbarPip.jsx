// @flow
import React from 'react';
import { PipWrapper } from './styles';
import Pip from '../components/pip';

type NavbarPipProps = {
  hasActions?: boolean,
};

const NavbarPip = ({ hasActions = false }: NavbarPipProps, ref) => (
  // $FlowFixMe
  <PipWrapper ref={ref}>
    <Pip hasActions={hasActions}/>
  </PipWrapper>
);

export default React.forwardRef<NavbarPipProps, HTMLDivElement>(NavbarPip);
