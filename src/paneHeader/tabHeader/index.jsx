// @flow
import React from 'react';
import styled from 'styled-components';
import { Wrapper, Title } from '../styles';
import Actionable from '../../components/Actionable';
import { MediumUp, Small } from '../../util/responsive';

const TAB_HEADER = 'TAB_HEADER';

type TabHeaderType = {|
  type: typeof TAB_HEADER,
  data: TabHeaderProps,
|};

type TabHeaderProps = {
  title: string,
  hideTab: () => void,
};

const Action = styled.button`
  outline: none;
  border: none;
  padding: 0;
  margin-right: 32px;
  color: ${props => props.theme.colors.gray50};
  line-height: 19px;
  background-color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
  margin-left: auto;
`;

const TabHeader = ({ title, hideTab }:TabHeaderProps) => (
  <Wrapper data-testid='tabHeader'>
    <MediumUp>
      <Title data-testid='tabHeader-title'>
        {title}
      </Title>
    </MediumUp>
    <Small>
      <Actionable onClick={hideTab} keepFocus={false}>
        <Action data-testid='tabHeader-hide'>
          Hide Tab
        </Action>
      </Actionable>
    </Small>
  </Wrapper>
);

export default React.memo < TabHeaderProps > (TabHeader);
export { TAB_HEADER };
export type { TabHeaderType };
