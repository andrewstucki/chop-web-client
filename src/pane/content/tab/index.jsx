// @flow
import React, { Suspense } from 'react';
import { HOST_INFO } from '../../../hostInfo/dux';
import HostInfo from '../../../hostInfo';
import { BIBLE, type TabType} from './dux';
import { SCHEDULE } from '../../../schedule/dux';
import PaneHeader from '../../../paneHeader';
import { TAB_HEADER } from '../../../paneHeader/tabHeader';
import { Trans, useTranslation } from 'react-i18next';
import { ComingSoonWrapper, ComingSoonText } from './styles';
import Schedule from '../../../schedule';
import { SCHEDULE_HEADER } from '../../../paneHeader/scheduleHeader';
import { EVENT_NOTES } from '../../../eventNotes/dux';
import EventNotes from '../../../eventNotes';

type TabPropsType = {
  type: TabType,
};

const renderTabContent = type => {
  switch (type) {
    case HOST_INFO:
      return <HostInfo />;
    case SCHEDULE:
      return <Schedule />;
    case EVENT_NOTES: {
      return (
        <Suspense fallback=''>
          <EventNotes/>
        </Suspense>
      );
    }
    case BIBLE:
      return <ComingSoon type={type} />;
    default:
      return null;
  }
};

const Tab = ({ type }:TabPropsType) => {
  const { t } = useTranslation();
  const headerData = {
    title: t(type.toLowerCase()).toUpperCase(),
  };
  const paneHeaderType = type === SCHEDULE ? SCHEDULE_HEADER : TAB_HEADER;
  return (
    <>
      <PaneHeader type={paneHeaderType} data={headerData} />
      { renderTabContent(type) }
    </>
  );
};

const ComingSoon = ({ type }:TabPropsType) => {
  const { t } = useTranslation();
  const feature = t(type.toLowerCase());
  return (
    <ComingSoonWrapper data-testid='comingSoon'>
      <ComingSoonText>
        <Trans i18nKey='feature_coming_soon'>
          {/* $FlowFixMe - TODO: Figure out how to make this i18n syntax work with Flow. */}
          <strong>{{feature}}</strong> is Coming Soon.
        </Trans>
      </ComingSoonText>
    </ComingSoonWrapper>
  );
};

export default React.memo < TabPropsType > (Tab);
