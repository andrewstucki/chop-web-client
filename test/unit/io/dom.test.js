//@flow
import reducer, { defaultState } from '../../../src/io/dom/dux';
import { toggleChatFocus } from '../../../src/chat/dux';

describe('DOM tests', () => {
  test('reducer with no action', () => {
    const result = reducer();
    expect(result).toEqual(defaultState);
  });

  test('set focus', () => {
    expect(document.body).toBeDefined();
    jest.useFakeTimers();
    window.innerHeight = 328;
    if (document.body) document.body.scrollTop = 50;
    reducer(
      defaultState,
      toggleChatFocus(true)
    );
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 150);
    if (document.body) expect(document.body.style.height).not.toEqual('328px');
    if (document.body) expect(document.body.scrollTop).toEqual(50);
    jest.runAllTimers();
    if (document.body) expect(document.body.style.height).toEqual('328px');
    if (document.body) expect(document.body.scrollTop).toEqual(0);
  });

  test('set focus', () => {
    expect(document.body).toBeDefined();
    if (document.body) document.body.scrollTop = 50;
    reducer(
      defaultState,
      toggleChatFocus(false)
    );
    if (document.body) expect(document.body.style.height).toEqual('100%');
    if (document.body) expect(document.body.scrollTop).toEqual(0);
  });
});

