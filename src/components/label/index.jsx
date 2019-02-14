import React from 'react';
import Wrapper from './styles';

type LabelPropsType = {
  text: string,
};

const Index = ({text}:LabelPropsType) => (
  <Wrapper>{text}</Wrapper>
);

export default Index;
