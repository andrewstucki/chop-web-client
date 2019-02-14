import React from 'react';
import { mount, shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import { theme } from './theme';

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

const promisifyMiddleware = ({_dispatch, _getState}) => next => action => new Promise( resolve => resolve(next(action)) );

const shallowWithTheme = children => shallow(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

const mountWithTheme = children => mount(<ThemeProvider theme={theme}>{children}</ThemeProvider>);

export { mockDate, promisifyMiddleware, shallowWithTheme, mountWithTheme };
