import styled from 'styled-components';
import { theme } from '../styles';

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
  color: ${theme.colors.textColor};
  background-color: ${theme.colors.warningText};
`;

const ErrorBanner = styled(Banner)`
  color: ${theme.colors.background};
  background-color: ${theme.colors.dangerText};
`;

const NotificationBanner = styled(Banner)`
  color: ${theme.colors.background};
  background-color: ${theme.colors.validGreen};
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