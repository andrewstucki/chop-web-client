// @flow
import React from 'react';
import sinon from 'sinon';
import NavHeader from '../../src/navHeader/navHeader';
import ConnectedNavHeader from '../../src/navHeader';
import { renderWithTheme, renderWithReduxAndTheme } from '../testUtils';
import { fireEvent } from '@testing-library/react';

describe('NavHeader tests', () => {
  test('Component renders', () => {
    const { getByTestId, queryByTestId } = renderWithTheme(
      <NavHeader openMenu={() => {}} logoUrl={''} backgroundColor='' iconColor='' />
    );
    expect(getByTestId('navHeader')).toBeTruthy();
    expect(queryByTestId('navHeader-logo')).toBeFalsy();
  });

  test('Clicking the hamburger triggers openMenu', () => {
    const openMenu = sinon.spy();
    const { getByTestId } = renderWithTheme(
      <NavHeader openMenu={openMenu} logoUrl={''} backgroundColor='' iconColor='' />
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

  test('Connected NavHeader renders logo', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <ConnectedNavHeader />,
      {
        feed: {
          organization: {
            id: 0,
            name: 'Jedi Academy',
            logoUrl: 'https://chop.com/logo/url',
            theme: {
              headerBackgroundColor: 'red',
              headerMenuIconColor: 'white',
            },
          },
        },
      }
    );

    expect(getByTestId('navHeader-logo')).toBeTruthy();
    expect(getByTestId('navHeader-logo').getAttribute('src')).toEqual('https://chop.com/logo/url');
  });
});
