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

export {
  ExternalLink,
  LinkIcon,
  OrganizationTitle,
  EventTitle,
  EventDescription,
  Nickname,
  Profile,
  ProfileActions,
};
