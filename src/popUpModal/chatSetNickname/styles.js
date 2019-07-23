// @flow
import styled from 'styled-components';
import { SubmitButton as Button } from '../login/styles';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../../cwc-types';

const IconWrapper:ComponentType<NoPropsType>  = styled.span`
  margin-right: 6px;
`;

const SubmitButton:ComponentType<NoPropsType>  = styled(Button)`
  padding: 8px 24px 8px 14px;
`;

export {
  IconWrapper,
  SubmitButton,
};
