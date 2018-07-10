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
    <Provider store={store}>
      <Placeholder
        data={
          {
            type: 'ANCHOR_MOMENT',
            id: '12345',
            text: 'Would you like to give your life to Christ?',
            subText: '1 hand raised',
            showReleaseAnchorButton: true,
          }
        }
        releaseAnchorMoment={action('clicked')}
        renderPlaceholder={true}
      />
    </Provider>
  ));
