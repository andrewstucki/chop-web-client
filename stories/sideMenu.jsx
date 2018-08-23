// @flow
/* global module */
import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import SideMenuComponent from '../src/components/sideMenu';
import SideMenu from '../src/sideMenu/sideMenu';

const currentUser = {
  id: 'string',
  name: 'Ben Butters',
  pubnubToken: 'string2',
  pubnubAccessToken: 'string3',
  role: {
    label: 'Host',
    permissions: [],
  },
};

const languageOptions = [
  {
    code: 'en',
    name: 'English',
  },
  {
    code: 'ja-jp',
    name: 'Japanese',
  },
  {
    code: 'fr',
    name: 'French',
  },
  {
    code: 'sp',
    name: 'Spanish',
  },
  {
    code: 'gm',
    name: 'German',
  },
  {
    code: 'it',
    name: 'Italian',
  },
  {
    code: 'ko',
    name: 'Korean',
  },
];

const feed = () => (
  {
    languageOptions: languageOptions,
  }
);

const store = createStore(() => (
  {
    feed: feed(),
  }
));

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
    <Provider store={store}>
      <SideMenu
        publishPrayerRequestNotification={action('clicked')}
        hostChannel="host"
        currentUser={currentUser}
        logout={action('logout')}
        close={action('close')}
        isClosed={false}
        languageOptions={languageOptions}
        setLanguage={() => {}}
      />
    </Provider>
  ));
