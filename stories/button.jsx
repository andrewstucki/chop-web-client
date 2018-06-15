/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Button from '../src/components/button';

storiesOf('Button', module)
  .add('default', () => (
    <Button
      onClick={action('clicked')}
      text="Click Me"
      type="default"
    />
  ))
  .add('icon', () => (
    <Button
      onClick={action('clicked')}
      text="↑"
      type="icon"
    />
  ));