// @flow
import reducer, {
  defaultState,
  getTrayStatus,
  openMessageTray,
} from '../../../src/components/message/dux';

describe('Message tests', () => {
  test('default state', () => {
    const result = reducer();
    expect(result).toEqual(defaultState);
  });

  test('Opens message tray', () => {
    const result = reducer(defaultState, openMessageTray());
    expect(result).toEqual({
      ...defaultState,
      messageTrayOpen: true,
    });
  });

  test('Get message tray status', () => {
    const result = getTrayStatus({
      ...defaultState,
      messageTrayOpen: true,
    });
    expect(result).toEqual(true);
  });
});
