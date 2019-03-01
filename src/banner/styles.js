import styled from 'styled-components';

const Banner = styled.div`
  font-size: 16px;
  display: flex;
  flex-direction: row;
  position: absolute;
  align-items: center;
  z-index: 2;
  width: 100%;
  animation: 300ms var(--ease-out) 0ms slideOpen;
  min-height: 48px;
  z-index: 100;
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
  WarningBanner,
  ErrorBanner,
  NotificationBanner,
  BannerMessage,
};
