// @flow
import { changeChannel } from '../../src/feed/dux';

import reducer, { getChannels } from '../../src/navBar/dux';

describe('NavBar tests', () => {
  test('default state', () => {
    const result = reducer();
    expect(result).toEqual({
      channels: [
        'default',
        'host',
      ],
      currentChannel: 'default',
    });
  });

  test('change current channel', () => {
    const result = reducer(
      {
        channels: [
          'default',
          'host',
        ],
        currentChannel: 'default',
      },
      changeChannel('host')
    );
    expect(result).toEqual({
      channels: [
        'default',
        'host',
      ],
      currentChannel: 'host',
    });
  });

  test('channel selector test', () => {
    const result = getChannels(
      {
        channels: {
          public: [],
          host: [],
        },
        currentChannel: 'public',
        chatInput: '',
        currentUser: {
          id: '',
          nickname: 'bob',
        },
        appendingMessage: false,
      }
    );
    expect(result).toEqual([
      {
        id: 'public',
        isCurrent: true,
        hasActions: false,
      },
      {
        id: 'host',
        isCurrent: false,
        hasActions: false,
      },
    ]);
  });

  test('show pip in public', () => {
    const result = getChannels(
      {
        channels: {
          public: [
            {
              type: 'ACTIONABLE_NOTIFICATION',
              active: true,
            },
          ],
          host: [],
        },
        currentChannel: 'public',
        chatInput: '',
        currentUser: {
          id: '',
          nickname: 'bob',
        },
        appendingMessage: false,
      }
    );
    expect(result).toEqual([
      {
        id: 'public',
        isCurrent: true,
        hasActions: true,
      },
      {
        id: 'host',
        isCurrent: false,
        hasActions: false,
      },
    ]);
  });

  test('show pip in host', () => {
    const result = getChannels(
      {
        channels: {
          public: [
            {
              type: 'ACTIONABLE_NOTIFICATION',
              active: false,
            },
          ],
          host: [
            {
              type: 'ACTIONABLE_NOTIFICATION',
              active: true,
            },
          ],
        },
        currentChannel: 'public',
        chatInput: '',
        currentUser: {
          id: '',
          nickname: 'bob',
        },
        appendingMessage: false,
      }
    );
    expect(result).toEqual([
      {
        id: 'public',
        isCurrent: true,
        hasActions: false,
      },
      {
        id: 'host',
        isCurrent: false,
        hasActions: true,
      },
    ]);
  });
});
