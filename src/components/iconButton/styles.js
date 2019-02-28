// @flow
import styled from 'styled-components';

type IconButtonPropsType = {
  size: number,
  background: string,
};

const IconButton = styled.button`
  display: flex;
  border-radius: 24px;
  outline: none;
  border: none;
  align-items: center;
  justify-content: center;
  padding: 0;
  background: ${(props:IconButtonPropsType) => props.background};
  width: ${(props:IconButtonPropsType) => props.size}px;
  height: ${(props:IconButtonPropsType) => props.size}px;
`;

export default IconButton;
