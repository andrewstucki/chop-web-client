import styled from 'styled-components';

const ExternalLink = styled.a`
  &&& { 
    color: ${props => props.theme.colors.gray50};
  }
  
  margin-bottom: 24px;
`;

type LinkIconPropsType = {
  withStroke: boolean,
  theme: any,
};

const LinkIcon = styled.span`
  width: 16px;
  display: inline-block;
  vertical-align: middle;
  margin-left: 6px;
  
  svg path {
    fill: ${props => props.theme.colors.gray50};
    ${(props:LinkIconPropsType) => props.withStroke && `
      stroke: ${props.theme.colors.gray50};
  `}
  }
`;

const OrganizationTitle = styled.div`
  font-weight: bold;
  line-height: 25px;
  font-size: 20px;
  margin-bottom: 0.5rem;
`;

const EventTitle = styled.div`
  font-weight: bold;
  line-height: 20px;
`;

const EventDescription = styled.div`
  line-height: 17px;
  font-size: 13px;
  margin-bottom: 40px;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  background-color: ${props => props.theme.colors.gray10};
  padding-bottom: 1.5rem;
  margin-bottom: 24px;
  
  & > div:first-child {
    margin-top: -2rem;
  }
`;

const Nickname = styled.div`
  font-weight: bold;
  line-height: 20px;
  margin-top: 0.5rem;
  color: ${props => props.theme.colors.textColor};
`;

const ProfileActions = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  
  ${LinkIcon} {
    width: 20px;
  }
  
  a {
    color: ${props => props.theme.colors.gray50};
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  background-color: rgba(30, 31, 35, 0.75);
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  z-index: 5;
  transition: opacity ${props => props.theme.animation.duration} ${props => props.visible ? props.theme.animation.easeOut : props.theme.animation.easeIn + ', transform ' + props.theme.animation.duration + ' step-end'};
  transform: translateX(${props => props.visible ? '0px' : '-100%'});
  opacity: ${props => props.visible ? 1 : 0};
`;

const Menu = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  height: 100%;
  width: calc(100% - 56px);
  max-width:400px;
  color: ${props => props.theme.animation.textColor};
  overflow-x: scroll;
  z-index: 6;
  box-sizing: border-box;
  padding: 1.5rem 1rem;
  background-color: ${props => props.theme.colors.background};
  transition: transform ${props => props.theme.animation.duration};
  will-change: transform;
  transform: translateX(${props => props.open ? '0px' : '-100%'});
  transition-timing-function: ${props => props.open ? props.theme.animation.easeOut : props.theme.animation.easeIn};
  
  @media (min-width: 640px) {
    top: 8px;
    height: auto;
    border-radius: 4px;
    transform: translateX(${props => props.open ? '8px' : '-100%'});
  }
`;

const LogOutButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  color: ${props => props.theme.colors.gray50};
  
  ${LinkIcon} {
    margin-left: 0;
  }
`;

export {
  ExternalLink,
  LinkIcon,
  OrganizationTitle,
  EventTitle,
  EventDescription,
  Nickname,
  Profile,
  ProfileActions,
  Overlay,
  Menu,
  LogOutButton,
};
