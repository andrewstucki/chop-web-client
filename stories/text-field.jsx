import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import TextField from '../src/components/text-field';

storiesOf('TextField', module)
  .add('blank', () => (
    <TextField onKeyUp={action('clicked')} />
  )).add('with text', () => (
    <TextField onKeyUp={action('clicked')} value="Hello TextField" />
  ))