// @flow
/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

import Notification from '../src/moment/notification';
import '../assets/global.css';

storiesOf('Notification', module)
  .add('default', () => (
    <Notification 
      text="@bonniboo started a direct chat with @shoobishoo"
      timeStamp="9:33pm"
    />
  ));
