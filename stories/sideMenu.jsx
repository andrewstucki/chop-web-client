import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SideMenu from '../src/components/sideMenu';

storiesOf('SideMenu', module)
  .add('Basic', () => (
    <SideMenu>
      Hello
    </SideMenu>
  ))