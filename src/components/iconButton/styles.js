// @flow
import styled from 'styled-components';

type IconButtonPropsType = {
  size: number,
  background: string,
  padding: string,
};

const IconButton = styled.button`
  display: flex;
  border-radius: 24px;
  outline: none;
  border: none;
  align-items: center;
  justify-content: center;
  padding: ${(props:IconButtonPropsType) => props.padding};
  background: ${(props:IconButtonPropsType) => props.background};
  min-width: ${(props:IconButtonPropsType) => props.size}px;
  height: ${(props:IconButtonPropsType) => props.size}px;
`;

export default IconButton;
