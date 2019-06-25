// @flow
import styled from 'styled-components';
import { Wrapper as InputFieldWrapper } from '../../components/inputField/styles';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../../cwc-types';

export const Wrapper:ComponentType<NoPropsType> = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
`;

export const ButtonWrapper:ComponentType<NoPropsType> = styled.div`
  display: flex;
  width: 100%;
  
  button:last-child {
    margin-left: auto;
  }
`;

export const AvatarWrapper:ComponentType<NoPropsType> = styled.div`
  background-color: ${props => props.theme.colors.gray10};
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px 16px 16px;
  margin-top: -16px;
  font-size: 13.44px;
  
  ${InputFieldWrapper} {
    padding-top: 16px;
    padding-bottom: 8px;
  }
`;

export const FieldWrapper:ComponentType<NoPropsType> = styled.div`
  width: 100%;
  
  ${InputFieldWrapper}:first-of-type {
    padding-top: 24px;
  }
`;

export const FileInput:ComponentType<NoPropsType> = styled.input`
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
`;

export const FileInputLabel:ComponentType<NoPropsType> = styled.label`
    display: inline-block;
    margin-top: 0.5rem;
    color: ${props => props.theme.colors.gray50};
    cursor: pointer;
`;

export const ChangeAvatarWrapper:ComponentType<NoPropsType> = styled.div`
  margin-top: 0.5rem;
  div {
    display: inline-block;
    cursor: pointer;
    color: ${props => props.theme.colors.gray50};
  }
`;
