// @flow
/* global SyntheticMouseEvent */
import React from 'react';
import { Wrapper, Title, StrokeIcon, FillIcon } from './styles';
import AngleRight from '../../../assets/angle-right.svg';
import Label from '../../components/label';
import { useTranslation } from 'react-i18next';

type SideMenuItemProps = {
  active: boolean,
  icon: any,
  title: string,
  onClick: (event:SyntheticMouseEvent<HTMLDivElement>) => void | () => void,
  comingSoon?: boolean,
};

const SideMenuItem = ({ active, icon, title, onClick, comingSoon }:SideMenuItemProps) => {
  const { t } = useTranslation();
  return (
    <Wrapper active={active} onClick={onClick} comingSoon={comingSoon}>
      <FillIcon
        active={active}
        comingSoon={comingSoon}
        dangerouslySetInnerHTML={{ __html: icon }}
      />
      <Title>{title}</Title>
      {comingSoon ?
        <Label text={t('coming_soon')}/>
        :
        <StrokeIcon
          active={active}
          comingSoon={comingSoon}
          dangerouslySetInnerHTML={{ __html: AngleRight }}
        />
      }
    </Wrapper>
  );
};

export default React.memo < SideMenuItemProps > (SideMenuItem);
