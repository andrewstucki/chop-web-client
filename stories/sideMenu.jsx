import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SideMenu from '../src/components/sideMenu';

storiesOf('SideMenu', module)
  .add('Basic', () => (
    <SideMenu close={action('clicked')} isClosed={false}>
      Hello
    </SideMenu>
  ))
  .add('Closed', () => (
    <SideMenu close={action('clicked')} isClosed={true}>
      Hello
    </SideMenu>
  ))
  .add('links', () => (
    <SideMenu close={action('clicked')} isClosed={false}>
      <a href="life.church">Live.Church</a>
      <a href="google.com">Google</a>
      <a href="yahoo.com">yahoo</a>
    </SideMenu>
  ))