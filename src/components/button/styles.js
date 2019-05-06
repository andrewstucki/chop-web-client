// @Flow
import styled, { css } from 'styled-components';
import type { ButtonPropsType } from './';
import type { ThemeType } from '../../styles';
import {BUTTON_LARGE, BUTTON_MEDIUM, BUTTON_SMALL, BUTTON_XLARGE, BUTTON_XSMALL} from './';

type StyledButtonPropsType = ButtonPropsType & { theme: ThemeType };

const Button = styled.button`
  box-sizing: border-box;
  border: 1px solid ${(props:StyledButtonPropsType) => props.theme.buttons[props.variant].border || 'transparent'};
  border-radius: 25.5px;
  outline: none;
  background-color: ${(props:StyledButtonPropsType) => props.theme.buttons[props.variant].default};
  color: ${(props:StyledButtonPropsType) => props.theme.buttons[props.variant].text};
  
  &:hover {
    box-shadow: ${(props:StyledButtonPropsType) => props.theme.shadows.shadow2};
    background-color: ${(props:StyledButtonPropsType) => props.theme.buttons[props.variant].hover};
  }
  
  &:active {
    background-color: ${(props:StyledButtonPropsType) => props.theme.buttons[props.variant].active};
    border: 1px solid transparent;
  }
  
  &:focus {
    box-shadow: ${(props:StyledButtonPropsType) => props.theme.buttons[props.variant].focusShadow};
  }
  
  &:disabled {
    background-color: ${(props:StyledButtonPropsType) => props.theme.colors.gray10};
    color: ${(props:StyledButtonPropsType) => props.theme.colors.gray50};
    border: 1px solid transparent;
  }
  
  ${props => {
    switch (props.size) {
      case BUTTON_XSMALL:
        return css`
          font-size: 10.72px;
          line-height: 13px;
          padding: 5px 12px;
        `;
      case BUTTON_SMALL:
        return css`
          font-size: 12.8px;
          line-height: 16px;
          padding: 6px 16px 8px 16px;
        `;
      case BUTTON_MEDIUM:
        return css`
          padding: 9px 24px;
          font-size: 16px;
          line-height: 20px;
        `;
      case BUTTON_LARGE:
        return css`
          padding: 16px 32px 15px 32px;
          font-size: 20px;
          line-height: 25px;
        `;
      case BUTTON_XLARGE:
        return css`
          padding: 17px 40px 15px 40px;
          font-size: 24.96px;
          line-height: 31px;
        `;
    }
  }
  
}
`;

export default Button;
