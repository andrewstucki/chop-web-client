import styled from 'styled-components';

const Container = styled.div`
  background-color: ${props => props.theme.colors.gray10};
  height: 100%;
  box-sizing: border-box;
  padding: 8px 8px 8px 0;
`;

const CellContainer = styled.div`
  height: 100%;
  box-sizing: border-box;
  border-radius: 4px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.background};
`;

export {
  Container,
  CellContainer,
};