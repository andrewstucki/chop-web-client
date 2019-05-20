// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../../cwc-types';

const Wrapper:ComponentType<NoPropsType> = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  
  &:after {
    content: '';
    width: 0;
    height: 0;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid ${props => props.theme.colors.gray50};
    right: 8px;
    position: absolute;
    pointer-events: none;
  }
`;

const Label:ComponentType<NoPropsType> = styled.label`
  color: ${props => props.theme.colors.gray50};
  line-height: 20px;
`;

const Select:ComponentType<NoPropsType> = styled.select`
  font-size: 16px;
  line-height: 20px;
  -webkit-appearance: none;
  display: inline-block;
  color: ${props => props.theme.colors.gray50};
  border: none;
  background: ${props => props.theme.colors.background};
`;

export { Wrapper, Label, Select };
