// @flow
import React from 'react';
import Dismiss from '../icons/dismissButton';
import type { BannerType } from './dux';
import IconButton from '../components/iconButton';
import {
  WarningBanner,
  ErrorBanner,
  NotificationBanner,
  BannerMessage,
} from './styles';
import { theme } from '../styles';
import { Trans } from 'react-i18next';

type BannerProps = {
  banner: BannerType,
  dismissNotification: () => void,
};

const DismissButton = ({dismissNotification}) => (
  <IconButton onClick={dismissNotification} size={48} >
    <Dismiss size={16} color={theme.colors.textColor} />
  </IconButton>
);

const Banner = (
  {
    banner,
    dismissNotification,
  }: BannerProps
) => {
  if (banner.message === '') {
    return null;
  }
  switch (banner.bannerType) {
    case 'notification': {
      const name = banner.message;
      return (
        <NotificationBanner>
          <DismissButton dismissNotification={dismissNotification}/>
          <BannerMessage>
            <Trans ns='notifications' i18nKey='user_muted'>
              {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
              <strong>{{name}}</strong> was muted.
            </Trans>
          </BannerMessage>
        </NotificationBanner>
      );
    }
    case 'error':
      return (
        <ErrorBanner>
          <DismissButton dismissNotification={dismissNotification}/>
          <BannerMessage>{banner.message}</BannerMessage>
        </ErrorBanner>
      );
    case 'warning':
      return (
        <WarningBanner>
          <DismissButton dismissNotification={dismissNotification}/>
          <BannerMessage>{banner.message}</BannerMessage>
        </WarningBanner>
      );
    default:
      return null;
  }
};

export default Banner;
