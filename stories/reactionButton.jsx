/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

import ReactionButton from '../src/reactionButton';

storiesOf('ReactionButton', module)
  .add('default', () => (
    <ReactionButton />
  ));