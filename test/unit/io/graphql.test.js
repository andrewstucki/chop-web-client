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
        event: {
          startTime: 1531864800,
          id: 334494,
          timezone: 'America/Chicago',
          title: 'Fake Event',
        },
        video: {
          type: 'StandardEmbed',
          url: 'https://www.youtube.com/embed/bz2kN31m_S0',
        },
        channels: {
          '123456': {
            id: '123456',
            name: 'public',
            moments: [],
          },
          '123456a': {
            id: '123456a',
            name: 'host',
            moments: [],
          },
          '123456b': {
            id: '123456b',
            name: 'request',
            moments: [],
          },
          '123456c': {
            id: '123456c',
            name: 'command',
            moments: [],
          },
        },
        organization: {
          id: 2,
          name: 'Life.Church',
        },
        user: {
          avatar: null,
          id: 123456,
          name: 'Bobby G.',
          pubnubAccessKey: '123456',
          pubnubToken: '1533912921585',
          role: {
            label: 'HOST',
            permissions: [
              'all-the-things',
            ],
          },
        },
        pubnubKeys: {
          publish: 'pub-c-1d485d00-14f5-4078-9ca7-19a6fe6411a7',
          subscribe: 'sub-c-1dc5ff9a-86b2-11e8-ba2a-d686872c68e7',
        },
        currentChannel: '123456',
        languageOptions: [
          {
            code: 'af',
            name: 'Afrikaans',
          },
          {
            code: 'en',
            name: 'English',
          },
          {
            code: 'ko',
            name: 'Korean',
          },
        ]
      },
    );
  });
});