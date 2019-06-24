// @flow
import React from 'react';
import Large from '../../../src/chop/layouts/large';
import { renderWithReduxAndTheme } from '../../testUtils';

describe('Large Layout', () => {
  test('Has correct elements', () => {
    const {getByTestId, debug } =  renderWithReduxAndTheme(
      <Large hasVideo={true} />
    );
    debug();
    expect(getByTestId('side-menu')).toBeTruthy();
    expect(getByTestId('pane')).toBeTruthy();
  });
});
