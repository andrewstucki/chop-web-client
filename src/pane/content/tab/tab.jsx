// @flow
import React from 'react';
import { HOST_INFO } from '../../../hostInfo/dux';
import HostInfo from '../../../hostInfo';
import type { TabTypeType } from './dux';
import PaneHeader from '../../../paneHeader';
import { TAB_HEADER } from '../../../paneHeader/tabHeader';

type TabPropsType = {
  type: TabTypeType,
  hideTab: (type: TabTypeType) => void
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

const Tab = ({ type, hideTab }:TabPropsType) => (
  <>
    <PaneHeader type={TAB_HEADER} data={{
      title: type.replace(/_/g, ' '),
      hideTab: () => hideTab(type),
    }}/>
    { renderTabContent(type) }
  </>
);

export default React.memo < TabPropsType > (Tab);
