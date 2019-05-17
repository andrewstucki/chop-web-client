import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';
import {toggleNavMenuExpanded, isNavMenuExpanded} from '../../src/navMenu/dux';

describe('NavMenu tests', () => {
  test('toggle expand', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );

    store.dispatch(toggleNavMenuExpanded());

    expect(isNavMenuExpanded(store.getState().feed)).toBeFalsy();
  });

  test('toggle expand', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
          nav: {
            ...defaultState.nav,
            expanded: false,
          },
        },
      }
    );

    store.dispatch(toggleNavMenuExpanded());

    expect(isNavMenuExpanded(store.getState().feed)).toBeTruthy();
  });
});
