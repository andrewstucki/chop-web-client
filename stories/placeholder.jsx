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
  .add('Salvation anchor moment', () => (
    <Provider store={store}>
      <Placeholder
        anchorMoment={
          {
            type: 'ANCHOR_MOMENT',
            id: '12345',
            text: 'I commit my life to Christ.',
            subText: '1 hand raised',
            showReleaseAnchorButton: true,
          }
        }
        releaseAnchorMoment={action('clicked')}
        renderPlaceholder={true}
      />
    </Provider>
  ));
