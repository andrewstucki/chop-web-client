// @flow
import React from 'react';
import { HOST_INFO } from '../../../hostInfo/dux';
import ActionBanner from '../../../components/actionBanner';
import HostInfo from '../../../hostInfo';
import type { TabTypeType } from './dux';

type TabPropsType = {
  type: TabTypeType,
  removeTab: (type: TabTypeType) => void,
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

const Tab = ({ type, removeTab }:TabPropsType) => (
  <>
    <ActionBanner
      text="Hide Tab"
      onClick={() => removeTab(type)}
    />
    { renderTabContent(type) }
  </>
);

export default React.memo < TabPropsType > (Tab);
