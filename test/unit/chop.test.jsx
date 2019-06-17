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
            theme: {
              headerBackgroundColor: '',
              headerMenuIconColor: '',
            },
          },
        },
      });
    expect(document.title).toEqual('live Jedi Academy');
  });

  test('Displays password reset modal', () => {
    delete global.location;
    global.location = { search: `?reset_token=123456` };
    const { queryAllByTestId } = renderWithReduxAndTheme(<ChopContainer/>);
    expect(queryAllByTestId('resetPassword-modal')).toBeTruthy();
  });
});
