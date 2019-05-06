import styled, { css } from 'styled-components';
import Button from '../components/iconButton/styles';

const Background = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  width: ${props => props.hideReactions ? '100%' : 'calc(100% - 48px)'};
  left: 0;
  bottom: 0;
`;

const Wrapper = styled.div`
  height: 20px;
  margin: 8px;
  padding: 10px 4px 10px 20px;
  border-radius: 24px;
  display: flex;
  align-items: center;
  touch-action: none;
  background-color: ${props => props.theme.colors.gray5};
  border: 1px solid transparent;
  
  ${props => props.focused && 
    css`
      border: 1px solid ${props => props.theme.colors.primary};
      background-color: rgb(255, 255, 255);
    `
}
  
  ${Button}:disabled {
      display: none;
  }
`;

export {
  Background,
  Wrapper,
};
