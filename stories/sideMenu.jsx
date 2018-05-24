import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SideMenuComponent from '../src/components/sideMenu';
import SideMenu from '../src/sideMenu/sideMenu'

storiesOf('SideMenu', module)
  .add('Basic Component', () => (
    <SideMenuComponent close={action('clicked')} isClosed={false}>
      Hello
    </SideMenuComponent>
  ))
  .add('Closed Component', () => (
    <SideMenuComponent close={action('clicked')} isClosed={true}>
      Hello
    </SideMenuComponent>
  ))
  .add('links Component', () => (
    <SideMenuComponent close={action('clicked')} isClosed={false}>
      <a href="life.church">Live.Church</a>
      <a href="google.com">Google</a>
      <a href="yahoo.com">yahoo</a>
    </SideMenuComponent>
  ))
  .add('Control', () => (
    <SideMenu
      logout={action('logout')}
      close={action('close')}
      isClosed={false} />
  ))