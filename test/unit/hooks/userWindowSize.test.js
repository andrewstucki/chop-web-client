import { act, renderHook } from 'react-hooks-testing-library';
import { useWindowSize } from '../../../src/hooks';

// simulate window resize
function fireResize (type, value) {
  switch (type) {
    case 'width':
      window.innerWidth = value;
      break;
    case 'height':
      window.innerHeight = value;
      break;
    default:
      break;
  }
  window.dispatchEvent(new Event('resize'));
}

describe('useWindowSize', () => {
  const hook = renderHook(() => useWindowSize());

  it('should update width', () => {
    act(() => {
      fireResize('width', 320);
      hook.rerender();
    });
    expect(hook.result.current.width).toBe(320);
    act(() => {
      fireResize('width', 640);
      hook.rerender();
    });
    expect(hook.result.current.width).toBe(640);
  });

  it('should update height', () => {
    act(() => {
      fireResize('height', 500);
      hook.rerender();
    });
    expect(hook.result.current.height).toBe(500);
    act(() => {
      fireResize('height', 1000);
      hook.rerender();
    });
    expect(hook.result.current.height).toBe(1000);
  });
});
