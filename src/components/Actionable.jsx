// @flow
/* global SyntheticEvent */
import React from 'react';

const preventDefault = (event: SyntheticEvent<HTMLButtonElement>) =>
  event.preventDefault();

const Actionable = ({onClick, keepFocus = false, tabable = true, children}: any) => {
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

export {
  Actionable,
};