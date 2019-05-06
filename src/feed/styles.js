import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex: 1;
  position: relative;
  overflow-y: scroll;
  overflow-x: hidden;
  overscroll-behavior-y: contain;
  -ms-scroll-chaining: none;
  -webkit-overflow-scrolling: touch;
  height: 100%;
  margin: 0;
`;

const MomentList = styled.ul`
  margin: 0;
  position: relative;
  bottom: 0;
  width: 100%;
  min-height: 100%;
  flex: 1;
  display: flex;
  flex-direction: column-reverse;
  
  span li {
    list-style-type: none;
  }
`;

const AnchorMomentWrapper = styled.div`
  display: flex;
  flex: 0 0 auto;
  position: relative;
  overflow-y: scroll;
`;

const AnchorMomentList = styled.ul`
  position: sticky;
  position: -webkit-sticky;
  bottom: 0;
  z-index: 1;
  margin-left: 0;
  
  li {
    list-style-type: none;
  }
`;

const NewMessageButtonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 0px;
  overflow: visible;
`;

const NewMessageButtonWrapper = styled.div`
  position: absolute;
  bottom: 8PX;
  left: 50%;
  margin-left: -60px;
`;

const ListContainer = styled.div`
  width: 100%;
`;

export { Wrapper, AnchorMomentWrapper, MomentList, AnchorMomentList, NewMessageButtonContainer, NewMessageButtonWrapper, ListContainer };
