// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../../cwc-types';

const Message:ComponentType<NoPropsType>  = styled.div`
  background-color: ${props => props.theme.colors.validText};
  color: ${props => props.theme.colors.background};
  padding: 12px 16px;
  line-height: 20px;
  font-size: 16px;
  margin: 8px;
`;

export {
  Message,
};