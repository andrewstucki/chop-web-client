// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../cwc-types';

export const PROGRESS = 'PROGRESS';
export const DANGER = 'DANGER';
export const REGRESS = 'REGRESS';

type ButtonType = 
  | typeof PROGRESS
  | typeof REGRESS
  | typeof DANGER;

type PopUpModalContainerPropsType = {
  isSmall: boolean,
};

type HeaderPropsType = {
  hasHeader: boolean,
};

type ButtonPropsType = {
  type: ButtonType,
};

const Wrapper:ComponentType<NoPropsType> = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(30, 31, 35, 0.5);
  width: 100%;
  height: 100%;
  position: absolute;
  z-index: 100;
`;

const PopUpModalContainer:ComponentType<PopUpModalContainerPropsType> = styled.div`
  background-color: ${props => props.theme.colors.background};
  margin: ${props => props.isSmall ? '16px' : '64px 16px'};
  padding: ${props => props.isSmall ? '8px' : '16px'};
  width: 100%;
  max-width: ${props => props.isSmall ? '400px' : '460px'};
  box-sizing: border-box;
  border-radius: 4px;
  shadow: ${props => props.theme.shadows.shadow3};
  overflow-y: scroll;
  max-height: ${props => props.isSmall ? 'calc(100% - 32px)' : 'calc(100% - 128px)'};
`;

const Header:ComponentType<HeaderPropsType> = styled.div`
  display: flex;
  justify-content: ${props => props.hasHeader ? 'space-between' : 'flex-end'};
  line-height: 20px;
  font-size: 20px;
  color: ${props => props.theme.colors.black};
  padding: 8px;
`;

const Text:ComponentType<NoPropsType> = styled.div`
  line-height: 20px;
  padding: 8px;
  font-size: 16px;
  color: ${props => props.theme.colors.black};
`;

const SmallText:ComponentType<NoPropsType> = styled.div`
  line-height: 17px;
  font-size: 13.44px;
  padding-top: 4px;
  color: ${props => props.theme.colors.gray50};
`;

const ActionContainer:ComponentType<NoPropsType> = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 8px;
`;

const Button:ComponentType<ButtonPropsType> = styled.button`
  border: none;
  padding-left: 8px;
  background-color: ${props => props.theme.colors.background};
  color: ${props => {
    if (props.type === PROGRESS) {
      return props.theme.colors.primary;
    } else if (props.type === DANGER) {
      return props.theme.colors.dangerText;
    } else {
      return props.theme.colors.gray50;
    }
  }};
`;

export {
  Wrapper,
  PopUpModalContainer,
  Header,
  Text,
  SmallText,
  ActionContainer,
  Button,
};
