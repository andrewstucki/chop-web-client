// @flow
/* global SyntheticEvent */
import * as React from 'react';

type ActionableProps = {
  onClick: any,
  keepFocus?: boolean,
  tabable?: boolean,
  children: any,
};

const preventDefault = (event: SyntheticEvent<HTMLButtonElement>) =>
  event.preventDefault();

const Actionable = ({onClick, keepFocus = false, tabable = true, children}: ActionableProps) => {
  const { type: nodeName } = children;
  const interactiveElement = ['button', 'a', 'input', 'select', 'textarea', 'details'].includes(nodeName);
  const addKeyboardSupport = !interactiveElement && tabable;

  const newProps = {
    onMouseDown: keepFocus ? preventDefault : null,
    onClick: onClick,
    onKeyPress: addKeyboardSupport ? onClick : null,
    tabIndex: addKeyboardSupport ? '0' : null,
    role: addKeyboardSupport ? 'button' : null,
  };

  return React.cloneElement(children, newProps);
};

export default React.memo < ActionableProps > (Actionable);
