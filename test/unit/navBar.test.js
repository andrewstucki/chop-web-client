// @flow
import { changeChannel } from '../../src/feed/dux';

import reducer, { getChannels } from '../../src/navBar/dux';

describe('NavBar tests', () => {
  test('default state', () => {
    const result = reducer();
    expect(result).toEqual({
      channels: [
        'public',
        'host',
      ],
      currentChannel: 'public',
    });
  });

  test('change current channel', () => {
    const result = reducer(
      {
        channels: [
          'public',
          'host',
        ],
        currentChannel: 'public',
      },
      changeChannel('host')
    );
    expect(result).toEqual({
      channels: [
        'public',
        'host',
      ],
      currentChannel: 'host',
    });
  });

  test('channel selector test', () => {
    const result = getChannels(
      {
        channels: [
          'public',
          'host',
        ],
        currentChannel: 'public',
      }
    );
    expect(result).toEqual([
      {
        channel: 'public',
        isCurrent: true,
      },
      {
        channel: 'host',
        isCurrent: false,
      },
    ]);
  });
});
