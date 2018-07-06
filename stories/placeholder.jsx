// @flow
/* global module */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import Placeholder from '../src/placeholder/placeholder';
import '../assets/global.css';

const store = createStore(() => {});

storiesOf('Placeholder', module)
  .add('Call to Christ anchor moment', () => (
    <Placeholder
      data={
        {
          type: 'CALL_TO_CHRIST',
          text: 'Would you like to give your life to Christ?',
          subText: 'hand raised',
          action: action('clicked'),
          showReleaseAnchorButton: true,
        }
      }
      renderPlaceholder={true}
      raisedHandCount={1}
    />
  ));
