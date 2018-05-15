// @flow
import { changeChannel } from '../../src/feed/dux';

import reducer from '../../src/navBar/dux';

describe('NavBar tests', () => {
  test('default state', () => {
    const result = reducer();
    expect(result).toEqual({
      channels: [
        'Default',
        'Host',
      ],
      currentChannel: 'default',
    });
  });

  test('change current channel', () => {
    const result = reducer(
      {
        channels: [
          'Default',
          'Host',
        ],
        currentChannel: 'default',
      },
      changeChannel('host')
    );
    expect(result).toEqual({
      channels: [
        'Default',
        'Host',
      ],
      currentChannel: 'host',
    });
  });
});
