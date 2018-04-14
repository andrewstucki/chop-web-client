import { reducer } from '../src/reducer';

test('Test reducer', () => {
  expect(reducer()).toEqual({name:'World'});
});