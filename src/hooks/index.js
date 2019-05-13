// @flow
import useScroll from './useScroll';
import useWindowSize from './useWindowSize';
import useWhyDidYouUpdate from './useWhyDidYouUpdate';

const isClient = typeof window === 'object';

export {
  isClient,
  useScroll,
  useWindowSize,
  useWhyDidYouUpdate,
};
