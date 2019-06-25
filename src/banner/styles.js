// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../cwc-types';
import { ERROR, WARNING, INFO } from './dux';

type BannerPropsType = {
  type:
    | typeof ERROR
    | typeof WARNING
    | typeof INFO
};

const BannerWrapper:ComponentType<NoPropsType> = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
  width: 100%;
`;

const Banner:ComponentType<BannerPropsType> = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  position: absolute;
  width: 100%;
  animation: 300ms var(--ease-out) 0ms slideOpen;
  min-height: 48px;
  z-index: 100;
  max-width: ${props => props.fullWidth ? '100%' : '400px'};
  top: ${props => props.fullWidth ? '0' : '4px'};
  border-radius: ${props => props.fullWidth ? '0' : '2px'};
  box-shadow: ${props => props.theme.shadows.shadow2};
  background-color: ${props => {
    if (props.type === WARNING) {
      return props.theme.colors.warningText;
    } else if (props.type === ERROR) {
      return props => props.theme.colors.dangerText;
    } else {
      return props.theme.colors.validText;
    }
  }};

  div {
    color: ${props => props.theme.colors.white};
  }
`;

const BannerMessage = styled.div`
  line-height: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 16px;
`;

export {
  BannerWrapper,
  Banner,
  BannerMessage,
};
