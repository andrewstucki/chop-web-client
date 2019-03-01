// @flow
/* global SyntheticMouseEvent */
import * as React from 'react';
import Actionable from '../Actionable';
import Button from './styles';

type IconButtonPropsType = {
  children: React.Node,
  size: number,
  onClick: (event: SyntheticMouseEvent<HTMLButtonElement>) => void,
  background?: string,
  keepFocus?: boolean,
  disabled?: boolean,
  hidden?: boolean,
};

const IconButton = ({ children, size, onClick, background = 'none', keepFocus, disabled, hidden }:IconButtonPropsType) => (
  <Actionable onClick={onClick} keepFocus={keepFocus}>
    <Button size={size}
      disabled={disabled}
      hidden={hidden}
      background={background}
    >
      { children }
    </Button>
  </Actionable>
);

export default React.memo < IconButtonPropsType > (IconButton);
