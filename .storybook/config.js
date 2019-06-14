import React from 'react';
import { configure, addDecorator } from '@storybook/react';
import { theme, GlobalStyle } from '../src/styles';
import { ThemeProvider } from 'styled-components';

// automatically import all files ending in *.stories.js
const req = require.context('../stories', true, /\.stories\.js$/);
function loadStories() {
  req.keys().forEach(filename => req(filename));
}

addDecorator(story => (
  <ThemeProvider theme={theme}>
    <>
      <GlobalStyle />
      {story()}
    </>
  </ThemeProvider>
));

configure(loadStories, module);
