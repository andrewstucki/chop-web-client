// @flow
import GraphQlActor from '../../../src/io/graph';
import graphqlJs from 'graphql.js';
import testData from './test-data.json';

describe('Test GraphQL', () => {
  test('Get initial data', () => {
    jest.mock('graphql.js');
    graphqlJs.__setFakeData(testData);

    const storeDispatch = jest.fn();
    const getStore = jest.fn();
    const actor = new GraphQlActor(storeDispatch, getStore);
    actor.dispatch(
      {
        type: 'GET_INIT_DATA',
      }
    );
    expect(storeDispatch.mock.calls.length).toBe(1);
    expect(storeDispatch.mock.calls[0][0]).toEqual(
      {
        type: 'SET_INIT_DATA',
        data: testData.data,
      }
    );
  });
});