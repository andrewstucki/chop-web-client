// @flow
import React from 'react';
import styled from 'styled-components';
import { Wrapper } from '../styles';

const CHAT_HEADER = 'CHAT_HEADER';

type ChatHeaderType = {
  type: typeof CHAT_HEADER,
  data: ChatHeaderProps,
};

type ChatHeaderProps = {
  title: string,
  subtitle?: string | number,
};

const Title = styled.div`
  color: ${props => props.theme.colors.gray100};
  font-size: 16px;
  font-weight: 500;
  text-transform: uppercase;
`;

const Subtitle = styled.div`
  color: ${props => props.theme.colors.gray50};
  font-size: 13.44px;
  padding-left: 4px;
`;

const ChatHeader = ({ title, subtitle }:ChatHeaderProps) => (
  <Wrapper data-testid='chatHeader'>
    <Title data-testid='chatHeader-title'>{title}</Title>
    { subtitle &&
      <Subtitle data-testid='chatHeader-subtitle'>{subtitle}</Subtitle>
    }
  </Wrapper>
);

export default React.memo < ChatHeaderProps > (ChatHeader);
export { CHAT_HEADER };
export type { ChatHeaderType, ChatHeaderProps };
