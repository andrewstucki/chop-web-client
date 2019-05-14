import styled from 'styled-components';

const NavbarWrapper = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.gray5};
  height: 32px;
  width: 100%;
  z-index: 1;
  -webkit-overflow-scrolling: touch;
  overflow-x: scroll;
  scroll-snap-type: x mandatory;
  scroll-padding: 0 24px;
`;

const NavbarItemWrapper = styled.button`
  display: flex;
  align-items: center;
  padding: 0 12px;
  color: ${props => props.isCurrent ? props.theme.colors.textColor : props.theme.colors.gray50};
  font-size: 10.72px;
  text-transform: uppercase;
  white-space: nowrap;
  position: relative;
  font-weight: 500;
  border: none;
  background-color: ${props => props.isCurrent ? props.theme.colors.white : 'transparent'};
  outline: none;
  scroll-snap-align: end;
  overflow: visible;
`;

const PipWrapper = styled.div`
  position: absolute;
  top: 4px;
  right: 2px;
  height: 8px;
  width: 8px;
`;

const TabOverflow = styled.div`
  position: fixed;
  cursor: pointer;
  z-index: 2;
  width: 24px;
  height: 32px;
`;

const TabOverflowWrapper = styled(TabOverflow)`
  right: 0;
`;

const InvertedTabOverflowWrapper = styled(TabOverflow)`
  left: 0;
  transform: scale(-1,1);
`;

export {
  NavbarWrapper,
  NavbarItemWrapper,
  PipWrapper,
  TabOverflowWrapper,
  InvertedTabOverflowWrapper,
};
