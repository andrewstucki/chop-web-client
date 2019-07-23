import React from 'react';
import { TextWrapper } from './styles';

type LabelPropsType = {
  text: string,
};

const Label = ({ text }:LabelPropsType) => (
  <TextWrapper>{text}</TextWrapper>
);

export default React.memo(Label);
