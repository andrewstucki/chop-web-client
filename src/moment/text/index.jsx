// @flow
import React from 'react';
import type { TextType } from './dux';

import { Wrapper } from './styles';

const Text = (
  {
    text,
  }: TextType) => (
  <div>
    <Wrapper>
      {text.text}
    </Wrapper>
  </div>
);

export default React.memo < TextType > (Text);
