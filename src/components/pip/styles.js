// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';

type DotPropsType = {
  hasActions:boolean,
};

const Dot:ComponentType<DotPropsType> = styled.div`
  height: ${props => props.hasActions ? '8px' : '6px'};
  width: ${props => props.hasActions ? '8px' : '6px'};
  border-radius: 50%;
  background-color: ${props => props.hasActions ? props.theme.colors.primary : props.theme.colors.gray50};
  margin: 0 auto;
`;

export {
  Dot,
};
