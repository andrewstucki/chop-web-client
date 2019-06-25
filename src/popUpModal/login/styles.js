// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../../cwc-types';
import { Button, SmallText } from '../styles';

type ErrorMessagePropsType = {
  visible: boolean,
};

export type InputFieldPropsType = {
  error: boolean,
  buttonPresent?: boolean,
};

type SubmitButtonPropsType = {
  small: boolean,
}

const SubmitButton:ComponentType<SubmitButtonPropsType> = styled.button`
  margin-left: 8px;
  background-color: ${props => props.theme.colors.primary};
  color: ${props => props.theme.colors.white};
  border-radius: 20px;
  border: none;
  padding: 10px 24px;
  margin-bottom: ${props => props.small ? '8px' : '0px'};

  &:focus {
    outline: none;
  }
`;

const InputWrapper:ComponentType<NoPropsType> = styled.div`
  display: flex;
  flex-direction: column;
  padding: 24px 8px 16px 8px;
`;

const InputFieldWrapper:ComponentType<NoPropsType> = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  position: relative;
`;

const InputField:ComponentType<InputFieldPropsType> = styled.input`
  color: ${props => props.theme.colors.gray100};
  caret-color: ${props => props.theme.colors.primary};
  flex-grow: 2;
  border: 0;
  border-bottom: 1px solid ${props => props.error ? props.theme.colors.dangerText : props.theme.colors.gray30};
  padding-bottom: 5px;
  padding-right: ${props => props.buttonPresent ? '60px' : '0px'};

  &:focus {
    outline: none;
    border-bottom: 1px solid ${props => props.theme.colors.primary};
  }
`;

const InputLabel:ComponentType<NoPropsType> = styled.label`
  position: absolute;
  cursor: text;
  color: ${props => props.theme.colors.gray50};
  transition: 0.15s ease-out;
  font-size: 16px;

  ${InputField}:focus ~ &, ${InputField}:not([value='']) ~ & {
    transform: translate(-13%, -85%) scale(.7);
    cursor: default;
  }
`;

// font-size: 13.44px;
// top: -16px;

const InputFieldButton:ComponentType<NoPropsType> = styled(Button)`
  position: absolute;
  flex: 1;
  right: 0px;

  &:focus {
    outline: none;
  }
`;

const ErrorMessage:ComponentType<ErrorMessagePropsType> = styled(SmallText)`
  color: ${props => props.theme.colors.dangerText};
  padding-top: 2px;
  display: ${props => props.visible ? 'block' : 'none'};
`;

const MessageWrapper = styled.div`
  padding: 0px 8px;
`;

export {
  SubmitButton,
  InputWrapper,
  InputField,
  InputLabel,
  InputFieldButton,
  InputFieldWrapper,
  ErrorMessage,
  MessageWrapper,
};
