import React from 'react';
import SideMenu from '../../../src/sideMenu';
import '../../../src/io/location';
import { renderWithReduxAndTheme } from '../../testUtils';
import { fireEvent } from '@testing-library/react';

jest.mock('../../../src/io/queries');
jest.mock('../../../src/io/location');


describe('Session', () => {
  test('logout', () => {
    global.location.assign = jest.fn();

    const { getByTestId } = renderWithReduxAndTheme(
      <SideMenu />
    );

    fireEvent.click(getByTestId('logout'));
    expect(global.location.assign).toHaveBeenCalledTimes(1);
    expect(global.location.assign).toHaveBeenCalledWith('https://live.life.church/sessions/sign_out');
  });
});
