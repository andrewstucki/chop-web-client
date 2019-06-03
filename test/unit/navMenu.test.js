import { createStore } from 'redux';
import reducer, { defaultState } from '../../src/chop/dux';
import {toggleNavMenuExpanded, isNavMenuExpanded} from '../../src/navMenu/dux';

describe('NavMenu tests', () => {
  test('toggle expand', () => {
    const store = createStore(
      reducer,
      defaultState
    );

    store.dispatch(toggleNavMenuExpanded());

    expect(isNavMenuExpanded(store.getState())).toBeFalsy();
  });

  test('toggle expand', () => {
    const store = createStore(
      reducer,
      {
        ...defaultState,
        feed: {
          ...defaultState.feed,
          nav: {
            ...defaultState.feed.nav,
            expanded: false,
          },
        },
      }
    );

    store.dispatch(toggleNavMenuExpanded());

    expect(isNavMenuExpanded(store.getState())).toBeTruthy();
  });
});
