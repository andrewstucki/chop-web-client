// @flow
import styled from 'styled-components';

type ActionButtonPropsType = {
  color: string,
};

const ActionButton = styled.button`
  font-size: 13.44px;
  font-weight: 500;
  
  border: none;
  outline: none;
  background-color: transparent;
  color: ${(props:ActionButtonPropsType) => props.color};
  flex-grow: 1;
  padding: 0;
  
  &:active {
    opacity: 0.5;
  }
  
  svg {
    width: 20px;
  }
  
`;

const CloseButton = styled.button`
  line-height: 0;
  padding: 0 8px;
  
  div {
    display: none;
  }
`;

export { ActionButton, CloseButton };
