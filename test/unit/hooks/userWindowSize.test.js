import { act, renderHook } from 'react-hooks-testing-library';
import { useWindowSize } from '../../../src/hooks';
import { simulateWindowResize } from '../../testUtils';

describe('useWindowSize', () => {
  const hook = renderHook(() => useWindowSize());

  it('should update width', () => {
    act(() => {
      simulateWindowResize('width', 320);
      hook.rerender();
    });
    expect(hook.result.current.width).toBe(320);
    act(() => {
      simulateWindowResize('width', 640);
      hook.rerender();
    });
    expect(hook.result.current.width).toBe(640);
  });

  it('should update height', () => {
    act(() => {
      simulateWindowResize('height', 500);
      hook.rerender();
    });
    expect(hook.result.current.height).toBe(500);
    act(() => {
      simulateWindowResize('height', 1000);
      hook.rerender();
    });
    expect(hook.result.current.height).toBe(1000);
  });
});
