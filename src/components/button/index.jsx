// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import Actionable from '../Actionable';
import StyledButton from './styles';

const BUTTON_PRIMARY = 'primary';
const BUTTON_SECONDARY = 'secondary';
const BUTTON_TERTIARY = 'tertiary';
const BUTTON_XSMALL = 'xsmall';
const BUTTON_SMALL = 'small';
const BUTTON_MEDIUM = 'medium';
const BUTTON_LARGE = 'large';
const BUTTON_XLARGE = 'xlarge';

type ButtonPropsType = {
  children: string,
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  keepFocus?: boolean,
  variant?: typeof BUTTON_PRIMARY | typeof BUTTON_SECONDARY | typeof BUTTON_TERTIARY,
  size?: typeof BUTTON_XSMALL | typeof BUTTON_SMALL | typeof BUTTON_MEDIUM | typeof BUTTON_LARGE | typeof BUTTON_XLARGE,
  disabled?: boolean,
  hidden?: boolean,
};

const Button = ({ children, onClick, keepFocus, variant = BUTTON_PRIMARY, size = BUTTON_MEDIUM, disabled = false, hidden = false }:ButtonPropsType) => (
  <Actionable onClick={onClick} keepFocus={keepFocus}>
    <StyledButton
      variant={variant}
      size={size}
      disabled={disabled}
      hidden={hidden}
    >
      {children}
    </StyledButton>
  </Actionable>
);

export default React.memo < ButtonPropsType > (Button);
export {
  BUTTON_PRIMARY,
  BUTTON_SECONDARY,
  BUTTON_TERTIARY,
  BUTTON_XSMALL,
  BUTTON_SMALL,
  BUTTON_MEDIUM,
  BUTTON_LARGE,
  BUTTON_XLARGE,
};
export type { ButtonPropsType };
