// @flow
import reducer, { changeChannel } from '../../src/feed/dux';

describe('Feed', () => {
  test('default state', () => {
    const result = reducer();
    expect(result).toEqual({
      channels: {
        default: []
      },
      currentChannel: 'default'
    });
  });

  test('change current channel', () => {
    const result = reducer(
      {
        channels: {
          default: []
        },
        currentChannel: 'default'
      },
      changeChannel('host')
    );
    expect(result).toEqual({
      channels: {
        default: []
      },
      currentChannel: 'host'
    });
  });
});
