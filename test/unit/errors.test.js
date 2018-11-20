// @flow
import { createStore } from 'redux';
import { addError, removeError } from '../../src/errors/dux';
import reducer from '../../src/chop/dux';
import { defaultState } from '../../src/feed/dux';

describe('Errors tests', () => {
  test('Error messages are added', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );
    const errorId = expect.stringMatching(/^[a-z0-9]{8}-([a-z0-9]{4}-){3}[a-z0-9]{12}$/);
    
    store.dispatch(
      addError('You do not have access to this area of the application.')
    );

    expect(store.getState().feed).toEqual(
      {
        ...defaultState,
        errors: [
          {
            id: errorId,
            message: 'You do not have access to this area of the application.',
          },
        ],
      }
    );
  });

  test('Error messages are removed.', () => {
    const store = createStore(
      reducer,
      {
        feed: {
          ...defaultState,
          errors: [
            {
              id: '12345',
              message: 'Email address is required.',
            },
          ],
        },
      }
    );
    
    store.dispatch(
      removeError('12345')
    );

    expect(store.getState().feed).toEqual(
      defaultState
    );
  });
});