// @flow
import React from 'react';
import sinon from 'sinon';
import NavHeader from '../../src/navHeader/navHeader';
import ConnectedNavHeader from '../../src/navHeader';
import { renderWithTheme, renderWithReduxAndTheme } from '../testUtils';
import { fireEvent } from 'react-testing-library';

describe('NavHeader tests', () => {
  test('Component renders', () => {
    const { getByTestId } = renderWithTheme(
      <NavHeader openMenu={() => {}} />
    );
    expect(getByTestId('navHeader')).toBeTruthy();
  });

  test('Clicking the hamburger triggers openMenu', () => {
    const openMenu = sinon.spy();
    const { getByTestId } = renderWithTheme(
      <NavHeader openMenu={openMenu} />
    );

    fireEvent.click(getByTestId('navHeader-openMenu'));
    expect(openMenu.calledOnce).toEqual(true);
  });

  test('Connected NavHeader updates state', () => {
    const { getByTestId, store } = renderWithReduxAndTheme(
      <ConnectedNavHeader />
    );

    fireEvent.click(getByTestId('navHeader-openMenu'));
    expect(store.getState().feed.isSideMenuClosed).toBeFalse();
  });
});
