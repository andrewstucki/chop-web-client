import React from 'react';
import { mount } from 'enzyme';
import { render } from 'react-testing-library';
import { ThemeProvider } from 'styled-components';
import { theme } from '../../src/styles';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState as defaultFeedState } from '../../src/feed/dux';

const mockDate = date => {
  const RealDate = Date;
  global.Date = class extends RealDate {
    constructor () {
      super();
      return new RealDate(date);
    }

    static now () {
      return date;
    }
  };
};

const defaultState = {
  feed: defaultFeedState,
  schedule: [],
  sequence: {
    serverTime: 0,
    steps: [],
  },
};

const mountWithTheme = children => mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

const ChopTheme = ({ children }) => (
  <ThemeProvider theme={theme}>
    {children}
  </ThemeProvider>
);

const renderWithTheme = (ui, options = {}) =>
  render(ui, { wrapper: ChopTheme, ...options });

const renderWithRedux = (ui, state = defaultState) => {
  const store = createStore(reducer, state);
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
};

const renderWithReduxAndTheme = (ui, state = defaultState, options = {}) => {
  const store = createStore(reducer, state);
  return {
    ...render(<Provider store={store}>{ui}</Provider>, { wrapper: ChopTheme, ...options }),
    store,
  };
};

export { mockDate, mountWithTheme, renderWithTheme, renderWithRedux, renderWithReduxAndTheme, defaultState };
