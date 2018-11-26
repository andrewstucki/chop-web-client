//@flow
import React from 'react';
import type { PaneContentType } from './dux';

type PanePropsType = {
  type: string,
  content: PaneContentType,
};

const Pane = ({type, content}:PanePropsType) => {
  switch (type) {
  case 'FAKE':
    return (
      <div>{content}</div>
    );
  default:
    return null;
  }
};

export default Pane;
