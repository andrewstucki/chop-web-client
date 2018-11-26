//@flow
import React from 'react';
import type PaneContentType from './dux';

type PanePropsType = {
  type: string,
  content: PaneContentType,
};

const Pane = ({type, content}) => {
  switch(type) {
  default:
    return null;
  }
};

export Pane;
