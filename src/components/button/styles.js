import styled from 'styled-components';

const IconButton = styled.button`
  border-radius: 24px;
  outline: none;
  border: none;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: none;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
`;

export {
  IconButton,
};