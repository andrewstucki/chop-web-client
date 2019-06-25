// @flow
import React from 'react';
import Dismiss from '../icons/dismissButton';
import IconButton from '../components/iconButton';
import type { BannerType } from './dux';
import {
  Banner,
  BannerMessage,
  BannerWrapper,
} from './styles';
import { theme } from '../styles';
import {
  INFO,
  WARNING,
  ERROR,
  LOGGED_IN,
  MUTED,
} from './dux';
import { Trans, useTranslation } from 'react-i18next';

type BannerProps = {
  banner: BannerType,
  fullWidth: boolean,
  dismissBanner: () => void,
  currentSubscriberNickname: string,
};

type DismissButtonProps = {
  dismissBanner: () => void,
};

const DismissButton = ({dismissBanner}:DismissButtonProps) => (
  <IconButton onClick={dismissBanner} size={48} id='banner-dismiss-button'>
    <Dismiss size={16} color={theme.colors.alternateTextColor} />
  </IconButton>
);

const NotificationBanner = (
  {
    banner,
    fullWidth,
    dismissBanner,
    currentSubscriberNickname,
  }: BannerProps
) => {
  const { t } = useTranslation('notifications');
  if ( banner.type === '' || banner.key === '') {
    return null;
  }

  switch (banner.type) {
    case INFO:
    case WARNING:
    case ERROR:
      return (
        <BannerWrapper>
          <Banner fullWidth={fullWidth} data-testid={`${banner.type}-banner`} type={banner.type}>
            <DismissButton dismissBanner={dismissBanner}/>
            <BannerMessage data-testid='banner-message'>
              {t(banner.key, {...banner.variables})}
            </BannerMessage>
          </Banner>
        </BannerWrapper>
      );
    case MUTED: {
      if (banner?.variables?.name) {
        return (
          <BannerWrapper>
            <Banner fullWidth={fullWidth} data-testid='muted-notification-banner' type={banner.type}>
              <DismissButton dismissBanner={dismissBanner}/>
              <BannerMessage data-testid='banner-message'>
                <Trans ns='notifications' i18nKey={banner.key}>
                  {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
                  <strong>{{name: banner.variables.name}}</strong> was muted.
                </Trans>
              </BannerMessage>
            </Banner>
          </BannerWrapper>
        );
      } else {
        return null;
      }
    }
    case LOGGED_IN: {
      if (currentSubscriberNickname) {
        return (
          <BannerWrapper>
            <Banner fullWidth={fullWidth} data-testid='logged-in-banner' type={banner.type}>
              <DismissButton dismissBanner={dismissBanner}/>
              <BannerMessage data-testid='banner-message'>
                <Trans ns='notifications' i18nKey={banner.key}>
                  {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
                    Logged in as <strong>{{name: currentSubscriberNickname}}</strong>
                </Trans>
              </BannerMessage>
            </Banner>
          </BannerWrapper>
        );
      } else {
        return null;
      }
    }
    default:
      return null;
  }
};

export default NotificationBanner;
