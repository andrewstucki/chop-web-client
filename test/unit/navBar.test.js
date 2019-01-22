// @flow
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';
import { setNavbarIndex } from '../../src/navBar/dux';

describe('NavBar tests', () => {
  test('Navbar index is updated', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );

    store.dispatch(
      setNavbarIndex(2)
    );

    const { lastAction, ...result } = store.getState().feed; // eslint-disable-line no-unused-vars

    expect(result).toEqual(
      {
        ...defaultState,
        navbarIndex: 2,
      }
    );
  });
});
