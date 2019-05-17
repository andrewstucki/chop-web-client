// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../../../cwc-types';

const ComingSoonWrapper:ComponentType<NoPropsType> = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const ComingSoonText:ComponentType<NoPropsType> = styled.div`
  margin-top: 8px;
  color: ${props => props.theme.colors.gray50};
`;

export { ComingSoonWrapper, ComingSoonText };
