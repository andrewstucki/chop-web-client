// @flow
import React from 'react';
import { mount } from 'enzyme';
import { render } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../src/styles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState as defaultFeedState } from '../../src/feed/dux';
import { defaultState as defaultScheduleState } from '../../src/schedule/dux';
import { defaultState as defaultSubscriberState } from '../../src/subscriber/dux';
import { defaultState as defaultEventState } from '../../src/event/dux';
import { defaultState as defaultUiState } from '../../src/ui/dux';
import type { ChopStateType } from '../../src/chop/dux';

const mockDate = (date:Date | number | string) => {
  const RealDate = Date;
  global.Date = class extends RealDate {
    constructor () {
      super();
      return new RealDate(date);
    }

    static now () {
      // $FlowFixMe
      return date;
    }
  };
};

const defaultState:ChopStateType = {
  feed: {
    ...defaultFeedState,
    auth: {
      accessToken: '123456',
      refreshToken: '098765',
    },
  },
  subscriber: {
    ...defaultSubscriberState,
    currentSubscriber: {
      id: '09876',
      pubnubAccessKey: '67890',
      avatar: 'https://avatars.com/avatar.png',
      nickname: 'Joan Jet',
      firstName: 'Joan',
      lastName: 'Jet',
      email: 'joanjet@theblackharts.rock',
      phoneNumber: '867-5309',
      role: {
        label: '',
        permissions: [],
      },
      preferences: {
        textMode: 'COMPACT',
      },
    },
  },
  schedule: defaultScheduleState,
  event: defaultEventState,
  sequence: {
    serverTime: 0,
    steps: [],
  },
  ui: defaultUiState,
};

const mountWithTheme = (children:any) => mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

const ChopTheme = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

const renderWithTheme = (ui:any, options:any = {}) =>
  render(ui, { wrapper: ChopTheme, ...options });

const renderWithRedux = (ui:any, state:any = defaultState) => {
  const store = createStore(reducer, state);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

const renderWithReduxAndTheme = (ui:any, state:any = defaultState, options:any = {}) => {
  const store = createStore(reducer, state);
  return {
    ...render(<Provider store={store}>{ui}</Provider>, { wrapper: ChopTheme, ...options }),
    store,
  };
};

const simulateWindowResize = (type: 'width' | 'height', value:number) => {
  switch (type) {
    case 'width':
      window.innerWidth = value;
      break;
    case 'height':
      window.innerHeight = value;
      break;
    default:
      break;
  }
  window.dispatchEvent(new Event('resize'));
};

export { mockDate, mountWithTheme, renderWithTheme, renderWithRedux, renderWithReduxAndTheme, defaultState, simulateWindowResize };
