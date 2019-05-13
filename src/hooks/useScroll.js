// @flow
/* global AnimationFrameID */
import { useState, useEffect, useRef} from 'react';

type StateType = {
  scrollLeft: number,
  scrollTop: number,
  scrollWidth: number,
};

/* istanbul ignore file */
export default (ref: {| current: ?HTMLElement |}): StateType => {
  const frame = useRef<?AnimationFrameID>();
  const [state, setState] = useState<StateType>({
    scrollLeft: 0,
    scrollTop: 0,
    scrollWidth: 0,
  });

  useEffect(() => {
    const handler = () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }

      frame.current = requestAnimationFrame(() => {
        if (ref.current) {
          const { scrollLeft, scrollTop, scrollWidth } = ref.current;
          setState({
            scrollLeft,
            scrollTop,
            scrollWidth,
          });
        }
      });
    };

    if (ref.current) {
      ref.current.addEventListener('scroll', handler, {
        capture: false,
        passive: true,
      });
    }

    return () => {
      if (frame.current) {
        cancelAnimationFrame(frame.current);
      }

      if (ref.current) {
        ref.current.removeEventListener('scroll', handler);
      }
    };
  }, [ref.current]);

  return state;
};
