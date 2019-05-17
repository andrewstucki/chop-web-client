// @flow
import React from 'react';
import { renderWithReduxAndTheme, defaultState } from '../testUtils';
import ChopContainer from '../../src/chop';

describe('Chop', () => {
  test('Sets document title', () => {
    renderWithReduxAndTheme(<ChopContainer/>,
      {
        ...defaultState,
        feed: {
          ...defaultState.feed,
          isAuthenticated: true,
          organization: {
            id: 0,
            name: 'Jedi Academy',
            logoUrl: '',
          },
        },
      });
    expect(document.title).toEqual('live Jedi Academy');
  });
});
