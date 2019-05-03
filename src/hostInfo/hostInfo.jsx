// @flow
import React from 'react';
import { isEmpty, sanitizeString } from '../util';
import { Wrapper, NoHostInfo } from './styles';
import emptyInfo from '../../assets/empty_info@2x.png';
import { useTranslation } from 'react-i18next';

type HostInfoPropsType = {
  hostInfo: string,
};

const HostInfo = ({hostInfo}:HostInfoPropsType) => {
  const { t } = useTranslation();
  return (
    <>
    {
      isEmpty(hostInfo) ?
        <NoHostInfo>
          <img src={emptyInfo} alt={t('host_info_empty')}/>
          <p>{t('host_info_empty')}</p>
        </NoHostInfo>
        :
        <Wrapper data-testid='hostInfo' dangerouslySetInnerHTML={{ __html: sanitizeString(hostInfo) }}/>
    }
    </>
  );
};

export default React.memo < HostInfoPropsType > (HostInfo);
