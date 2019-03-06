import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  background-color: rgba(255, 255, 255, 0.95);
  height: 48px;
  width: 100%;
  position: fixed;
  z-index: 1;
`;

type ActionPropsType = {
  primary: boolean,
  theme: any,
};

const Action = styled.button`
  outline: none;
  border: none;
  padding: 0;
  margin: auto 16px;
  color: ${(props:ActionPropsType) => props.primary ? props.theme.colors.primary : props.theme.colors.gray50};
  line-height: 19px;
  background-color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
`;

export { Wrapper, Action };
