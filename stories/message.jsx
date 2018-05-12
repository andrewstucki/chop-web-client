import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Message from '../src/components/message';
import '../assets/global.css';

storiesOf('Message', module)
  .add('simple', () => (
    <Message message="Maecenas sed diam eget risus varius blandit sit amet non magna." />
  ))