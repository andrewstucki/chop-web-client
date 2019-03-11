// @flow
import React from 'react';
import { isEmpty, sanitizeString } from '../util';
import { Wrapper, NoHostInfo } from './styles';
import emptyInfo from '../../assets/empty_info@2x.png';

type HostInfoPropsType = {
  hostInfo: string,
};

const HostInfo = ({hostInfo}:HostInfoPropsType) => (
  isEmpty(hostInfo) ?
    <NoHostInfo>
      <img src={emptyInfo} alt="There is no Host Info for this event."/>
      <p>There is no Host Info for this event.</p>
    </NoHostInfo>
    : <Wrapper dangerouslySetInnerHTML={{ __html: sanitizeString(hostInfo) }} />
);

export default React.memo < HostInfoPropsType > (HostInfo);
