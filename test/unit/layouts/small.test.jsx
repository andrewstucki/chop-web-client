// @flow
import React from 'react';
import Small from '../../../src/chop/layouts/small';
import { act } from '@testing-library/react';
import { renderWithReduxAndTheme, simulateWindowResize, defaultState } from '../../testUtils';

describe('Small Layout', () => {
  test('Hides video if height is less than 400', () => {
    let wrapper = null;
    act(() => {
      wrapper = renderWithReduxAndTheme(
        <Small />
      );
    });

    act(() => {
      simulateWindowResize('height', 399);
    });

    expect.assertions(1);
    if (wrapper) {
      expect(wrapper.store.getState().feed.isVideoHidden).toBeTrue();
    }
  });

  test('Shows video if height is greater than or equal to 400', () => {
    let wrapper = null;
    act(() => {
      wrapper = renderWithReduxAndTheme(
        <Small />,
        {
          ...defaultState,
          feed: {
            ...defaultState.feed,
            isVideoHidden: true,
          },
        }
      );
    });

    act(() => {
      simulateWindowResize('height', 400);
    });

    expect.assertions(1);
    if (wrapper) {
      expect(wrapper.store.getState().feed.isVideoHidden).toBeFalse();
    }
  });
});
