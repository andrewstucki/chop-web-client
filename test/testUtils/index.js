// @flow
import React from 'react';
import { mount } from 'enzyme';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../src/styles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState as defaultFeedState } from '../../src/feed/dux';
import { defaultState as defaultScheduleState } from '../../src/schedule/dux';

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

const defaultState = {
  feed: defaultFeedState,
  schedule: defaultScheduleState,
  sequence: {
    serverTime: 0,
    steps: [],
  },
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
