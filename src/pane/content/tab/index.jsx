// @flow
import React from 'react';
import { HOST_INFO } from '../../../hostInfo/dux';
import HostInfo from '../../../hostInfo';
import type { TabType } from './dux';
import PaneHeader from '../../../paneHeader';
import { TAB_HEADER } from '../../../paneHeader/tabHeader';
import { useTranslation } from 'react-i18next';

type TabPropsType = {
  type: TabType,
};

const renderTabContent = type => {
  switch (type) {
    case HOST_INFO:
      return (
        <HostInfo />
      );
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

export default React.memo < TabPropsType > (Tab);
