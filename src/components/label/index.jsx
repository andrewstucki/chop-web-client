import React from 'react';
import Wrapper from './styles';

type LabelPropsType = {
  text: string,
};

const Label = ({ text }:LabelPropsType) => (
  <Wrapper>{text}</Wrapper>
);

export default React.memo(Label);
