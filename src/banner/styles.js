import styled from 'styled-components';

const BannerWrapper = styled.div`
  display: flex;
  align-self: center;
  flex-direction: column;
`;

const Banner = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-self: center;
  position: absolute;
  width: 100%;
  animation: 300ms var(--ease-out) 0ms slideOpen;
  min-height: 48px;
  z-index: 100;
  max-width: ${props => props.fullWidth ? '100%' : '400px'};
  top: ${props => props.fullWidth ? '0' : '4px'};
  border-radius: ${props => props.fullWidth ? '0' : '2px'};
  box-shadow: ${props => props.theme.shadows.shadow2};
`;

const WarningBanner = styled(Banner)`
  color: ${props => props.theme.colors.textColor};
  background-color: ${props => props.theme.colors.warningText};
`;

const ErrorBanner = styled(Banner)`
  color: ${props => props.theme.colors.background};
  background-color: ${props => props.theme.colors.dangerText};
`;

const NotificationBanner = styled(Banner)`
  color: ${props => props.theme.colors.background};
  background-color: ${props => props.theme.colors.validText};
`;

const BannerMessage = styled.div`
  line-height: 20px;
  padding-top: 8px;
  padding-bottom: 8px;
  padding-right: 16px;
`;

export {
  BannerWrapper,
  WarningBanner,
  ErrorBanner,
  NotificationBanner,
  BannerMessage,
};
