// @flow
import React from 'react';
import styled from 'styled-components';
import { Wrapper, Title } from '../styles';
import Actionable from '../../components/Actionable';
import { MediumUp } from '../../util/responsive';
import { useTranslation } from 'react-i18next';

const DIRECT_CHAT_HEADER = 'DIRECT_CHAT_HEADER';

type DirectChatHeaderType = {
  type: typeof DIRECT_CHAT_HEADER,
  data: DirectChatHeaderProps,
};

type DirectChatHeaderProps = {
  otherSubscribersName: string,
  leaveChannel: () => void,
};

const Action = styled.button`
  outline: none;
  border: none;
  padding: 0 1rem;
  margin-left: auto;
  margin-right: 1rem;
  color: ${props => props.theme.colors.primary};
  line-height: 19px;
  background-color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
`;

const DirectChatHeader = ({ otherSubscribersName, leaveChannel }:DirectChatHeaderProps) => {
  const { t } = useTranslation();
  return (
    <Wrapper data-testid='directChatHeader'>
      <MediumUp>
        <Title data-testid='otherSubscribersName'>
          {otherSubscribersName}
        </Title>
      </MediumUp>
      <Actionable onClick={leaveChannel} keepFocus={false}>
        <Action data-testid='leave'>
          { t('leave') }
        </Action>
      </Actionable>
    </Wrapper>
  );
};

export default React.memo < DirectChatHeaderProps > (DirectChatHeader);
export { DIRECT_CHAT_HEADER };
export type { DirectChatHeaderType };
