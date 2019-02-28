import styled, { css } from 'styled-components';
import Button from '../components/iconButton/styles';

const Background = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  width: calc(100% - 56px);
  left: 0;
  bottom: 0;
`;

const Wrapper = styled.div`
  min-height: 36px;
  margin: 8px 8px 8px 8px;
  padding: 6px 6px 6px 24px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  touch-action: none;
  border: 1px solid transparent;
  background-color: ${props => props.theme.colors.gray5};
  
  ${props => props.focused && 
    css`
      border: 1px solid ${props => props.theme.colors.primary};
      background-color: rgb(255, 255, 255);
    `
}
  
  ${Button}:disabled {
      z-index: -1;
  }
`;

export {
  Background,
  Wrapper,
};
