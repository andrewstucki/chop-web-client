import styled from 'styled-components';
import { animated } from 'react-spring';

const PaneWrapper = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
`;

const PaneContentWrapper = styled(animated.div)`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 100%;
`;

export {
  PaneWrapper,
  PaneContentWrapper,
};
