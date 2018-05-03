import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextField from '../src/components/text-field';

storiesOf('TextField', module)
  .add('blank', () => (
    <TextField onInput={action('typed')} />
  )).add('with text', () => (
    <TextField onInput={action('typed')} value="Hello TextField" />
  ))