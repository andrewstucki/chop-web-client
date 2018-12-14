//@flow
import { createStore } from 'redux';
import reducer from '../../src/chop/dux';
import {defaultState, setClientInfo} from '../../src/feed/dux';

describe('Testing Client Info', () => {
  test('Gets and set client info', () => {
    const store = createStore(
      reducer,
      {
        feed: defaultState,
      }
    );

    store.dispatch(setClientInfo({
      countryCode: 'US',
      countryName: 'United States',
      city: 'Edmond',
      postal: '73034',
      latitude: 35.6665,
      longitude: -97.4798,
      ip: '205.236.56.99',
      state: 'Oklahoma',
    }));

    expect(store.getState().feed).toEqual(
      {
        ...defaultState,
        clientInfo: {
          countryCode: 'US',
          countryName: 'United States',
          city: 'Edmond',
          postal: '73034',
          latitude: 35.6665,
          longitude: -97.4798,
          ip: '205.236.56.99',
          state: 'Oklahoma',
        },
      }
    );
  });
});
