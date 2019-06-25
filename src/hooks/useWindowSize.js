// @flow
import { useEffect, useState } from 'react';
import { isClient } from '../util';

type StateType = {
  width: number,
  height: number,
};

export default (initialWidth:number = 0, initialHeight:number = 0) => {
  const [state, setState] = useState<StateType>({
    width: isClient ? window.innerHeight : initialWidth,
    height: isClient ? window.innherHeight : initialHeight,
  });

  useEffect(() => {
    if (isClient) {
      const handler = () => {
        setState({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      };
      window.addEventListener('resize', handler);
      return () => window.removeEventListener('resize', handler);
    }
  }, []);

  return state;
};
