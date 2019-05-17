// @flow
import React from 'react';
import { HOST_INFO } from '../../../hostInfo/dux';
import HostInfo from '../../../hostInfo';
import { BIBLE, SCHEDULE, NOTES, type TabType} from './dux';
import PaneHeader from '../../../paneHeader';
import { TAB_HEADER } from '../../../paneHeader/tabHeader';
import { Trans, useTranslation } from 'react-i18next';
import { ComingSoonWrapper, ComingSoonText } from './styles';

type TabPropsType = {
  type: TabType,
};

const renderTabContent = type => {
  switch (type) {
    case HOST_INFO:
      return <HostInfo />;
    case BIBLE:
    case SCHEDULE:
    case NOTES:
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
  return (
    <>
      <PaneHeader type={TAB_HEADER} data={headerData}/>
      { renderTabContent(type) }
    </>
  );
};

const ComingSoon = ({ type }:TabPropsType) => {
  const { t } = useTranslation();
  const feature = t(type.toLowerCase());
  return (
    <ComingSoonWrapper>
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
