import styled from 'styled-components';

type PaneContentWrapperPropsType = {
  offCanvas: boolean,
};

const PaneWrapper = styled.div`
  flex: 1;
  position: relative;
  height: 100%;
`;

const PaneContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  bottom: 0;
  transform: ${ (props:PaneContentWrapperPropsType) => props.offCanvas ? 'translate3d(-100%, 0, 0)' : 'translate3d(0, 0, 0)' };
  width: 100%; 
  height: 100%; 
`;

export {
  PaneWrapper,
  PaneContentWrapper,
};
