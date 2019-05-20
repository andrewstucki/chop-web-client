// @flow
import styled from 'styled-components';
import type { ComponentType } from 'react';
import type { NoPropsType } from '../cwc-types';

const Wrapper:ComponentType<NoPropsType> = styled.div`
  padding: 48px 16px 24px 16px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  ;
`;

const GroupHeader:ComponentType<NoPropsType> = styled.div`
  text-transform: uppercase;
  font-size: 13.44px;
  color: ${props => props.theme.colors.gray50};
  padding-bottom: 8px;
`;

const ItemsWrapper:ComponentType<NoPropsType> = styled.div`
  border-radius: 2px;
  background: ${props => props.theme.colors.gray10};
  color: ${props => props.theme.colors.textColor};
  margin-bottom: 1rem;
  padding: 0 12px;
`;

type ItemProps = {
  showBorder: boolean,
};

const Item:ComponentType<ItemProps> = styled.div`
  border-bottom: ${props => props.showBorder ? `1px solid ${props.theme.colors.white}` : 'none'};
  padding: 8px 0;
`;

const ItemTime:ComponentType<NoPropsType> = styled.div`
  font-size: 16px;
  font-weight: bold;
`;

const ItemTitle:ComponentType<NoPropsType> = styled.div`
  font-size: 13.44px;
  color: ${props => props.theme.colors.gray50};
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

const NoScheduleWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => props.theme.colors.disabled};
`;

const NoScheduleText = styled.p`
  text-transform: uppercase;
  color: ${props => props.theme.colors.gray50};
  margin-bottom: 1rem;
  font-size: 0.75rem;
`;

export { Wrapper, GroupHeader, ItemsWrapper, Item, ItemTime, ItemTitle, NoScheduleWrapper, NoScheduleText };
