import React from 'react';
import Wrapper from './styles';

type LabelPropsType = {
  text: string,
};

const Label = ({ text }:LabelPropsType) => (
  <Wrapper>{text}</Wrapper>
);

Label.whyDidYouRender = true;

export default React.memo(Label);
