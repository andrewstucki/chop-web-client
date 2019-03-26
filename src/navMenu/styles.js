import styled from 'styled-components';


const getColor = (colors, disabled, selected) => {
  if (disabled) {
    return colors.gray30;
  } else if (selected) {
    return colors.gray100;
  } else {
    return colors.gray50;
  }
};

const Label = styled.span`
  font-size: 10.24px;
  line-height: 13px;
  text-transform: capitalize;
`;

const Wrapper = styled.div`
  background-color: ${props => props.theme.colors.gray10};
  height: 100%;
  position: relative;
  width: ${props => props.expanded ? '200' : '64'}px;
  box-sizing: border-box;
  transition: width ${props => props.theme.animation.duration} ${props => props.expanded ? props.theme.animation.easeInOut : props.theme.animation.easeInOut};
  overflow: hidden;
`;

const InnerWrapper = styled.div`
  box-sizing: border-box;
  height: 100%;
  width: ${props => props.expanded ? '200' : '64'}px;
  padding: 64px 0;
  overflow-y: scroll;
`
;
const NavMenuHeader = styled.div`
  background-color: ${props => props.theme.colors.gray10};
  opacity: 0.95;
  display: flex;
  position: absolute;
  top: 0px;
  width: 100%;
`;
const NavMenuBody = styled.div`
`;
const NavMenuBodySection = styled.div`
  margin-top: 16px;
`;
const NavMenuFooter = styled.div`
  opacity: 0.95;
  background-color: ${props => props.theme.colors.gray10};
  display: flex;
  position: absolute;
  bottom: 0px;
  width: 100%;
 `;

const NavMenuIconWrapper = styled.div`
  width: ${props => props.expanded ? '52' : '64'}px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const NavMenuTextWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  color: ${props => getColor(props.theme.colors, props.disabled, props.selected) };
  font-size: 13.44px;
  font-weight: 500;
  text-align: left;
`;

const NavMenuCapTextWrapper = styled(NavMenuTextWrapper)`
  text-transform: uppercase;
`;

const NavMenuChurchName = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  color: ${props => props.theme.colors.gray50 };
  font-size: 13.44px;
  white-space: nowrap;
  font-weight: 500;
`;

const IconButton = styled.button`
  outline: none;
  -webkit-tap-highlight-color: transparent;
  display: inline-block;
  height: 64px;
  width: 64px;
  box-sizing: border-box;
  text-decoration: none;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
`;

const NavMenuButton = styled.button`
  outline: none;
  -webkit-tap-highlight-color: transparent;
  cursor: ${props => props.disabled ? 'auto' : 'pointer'};
  width: 100%;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  display: flex;
  align-items: stretch;
  box-sizing: border-box;
  border-radius: 2px;
  
  @media (any-hover: hover) {
    :hover {
      background-color: ${props => props.disabled ? 'transparent' : props.theme.colors.gray5};
    }
  }
`;

export {
  Wrapper,
  InnerWrapper,
  IconButton,
  NavMenuButton,
  NavMenuHeader,
  NavMenuBody,
  NavMenuBodySection,
  NavMenuFooter,
  NavMenuIconWrapper,
  NavMenuTextWrapper,
  NavMenuCapTextWrapper,
  NavMenuChurchName,
  Label,
  getColor,
};
