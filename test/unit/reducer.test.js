// @flow

import chopReducer from '../../src/chop-reducer';

test('Test Chop Reducer', () => {
  expect(chopReducer()).toEqual({name:'World'});
});