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
        channels: [
          'default',
          'host',
        ],
        currentChannel: 'default',
      }
    );
    expect(result).toEqual([
      {
        channel: 'default',
        isCurrent: true,
      },
      {
        channel: 'host',
        isCurrent: false,
      },
    ]);
  });
});
