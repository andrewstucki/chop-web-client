// @Flow
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../../cwc-types';

const Text:ComponentType<NoPropsType> = styled.div`
  color: ${props => props.theme.colors.primary};
  font-size: 13.44px;
  font-weight: 500;
  padding: 8px 0px 7px 5px;
  line-height: 17px;
`;

const Icon:ComponentType<NoPropsType> = styled.span`
  line-height: 0;

  svg {
    width: 20px;
    height: 20px;

    path {
      fill: ${props => props.theme.colors.primary};
    }
  }
`;

const Button:ComponentType<NoPropsType> = styled.button`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: absolute;
  background-color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 16px;
  outline: none;
  top: 8px;
  right: 8px;
  height: 32px;
  box-shadow: ${props => props.theme.shadows.shadow2};
  z-index: 2;
  padding: 0px 16px 0px 14px;

  &:hover {
    cursor: pointer;
  }
`;

export {
  Button,
  Icon,
  Text,
};