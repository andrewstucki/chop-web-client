// @flow
import React from 'react';
import { Wrapper, Title } from '../styles';
import { MediumUp } from '../../util/responsive';

const TAB_HEADER = 'TAB_HEADER';

type TabHeaderType = {
  type: typeof TAB_HEADER,
  data: TabHeaderProps,
};

type TabHeaderProps = {
  title: string,
};

const TabHeader = ({ title }:TabHeaderProps) => (
  <MediumUp>
    <Wrapper data-testid='tabHeader'>
      <Title data-testid='tabHeader-title'>
        {title}
      </Title>
    </Wrapper>
  </MediumUp>
);

export default React.memo < TabHeaderProps > (TabHeader);
export { TAB_HEADER };
export type { TabHeaderType };
