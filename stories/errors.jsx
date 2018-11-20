/* global module */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import Errors from '../src/errors';

const store = createStore(() => {});

storiesOf('Errors', module)
  .add('default', () => (
    <Provider store={store}>
      <Errors errors={['Email address is requred.', 'Password is required.']} />
    </Provider>
  ));