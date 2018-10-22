/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

import ReactionButton from '../src/reactions/reactionButton/reactionButton';

storiesOf('ReactionButton', module)
  .add('default', () => (
    <ReactionButton />
  ));