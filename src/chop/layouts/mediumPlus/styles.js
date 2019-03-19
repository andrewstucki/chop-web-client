// @flow
import styled from 'styled-components';
import type { ThemeType } from '../../../styles';

const Container = styled.div`
  background-color: ${props => props.theme.colors.gray10};
  height: 100%;
  box-sizing: border-box;
  padding: 0 8px 0 0;
`;

type CellContainerProps = {
  topCell?: boolean,
  bottomCell?: boolean,
  staticCell?: boolean,
  theme: ThemeType,
};

const CellContainer = styled.div`
  height: calc(100% - ${(props:CellContainerProps) => props.bottomCell ? '8px' : '16px'});
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${(props:CellContainerProps) => props.theme.colors.background};
  margin-top: ${(props:CellContainerProps) => props.bottomCell ? '0' : '8px'};
  margin-right: ${(props:CellContainerProps) => props.topCell || props.bottomCell ? '4px' : 0 };
  margin-left: ${(props:CellContainerProps) => props.staticCell ? '4px' : 0};
`;
export {
  Container,
  CellContainer,
};
