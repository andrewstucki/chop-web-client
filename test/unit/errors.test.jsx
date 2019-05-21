// @flow
import React from 'react';
import Errors from '../../src/errors';

import { renderWithReduxAndTheme } from '../testUtils';

test('Errors render.', () => {
  const state =
    {
      feed: {
        errors: [
          {
            id: 1,
            message: 'You do not have access to this area of the application.',
          },
          {
            id: 2,
            message: 'Email address is required.',
          },
        ],
      },
    };

  const { getByTestId, getAllByTestId } = renderWithReduxAndTheme(
    <Errors />,
    state
  );

  expect(getByTestId('errors').children).toHaveLength(2);
  expect(getAllByTestId('error-message')[0].textContent).toEqual('You do not have access to this area of the application.');
  expect(getAllByTestId('error-message')[1].textContent).toEqual('Email address is required.');
});
