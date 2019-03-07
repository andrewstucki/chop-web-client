import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  background-color: ${props => props.theme.colors.disabled};
  height: 56px;
  width: 300px;
  border-radius: 2px 0 0 2px;
  box-sizing: border-box;
  padding-left: 12px;
`;

export { Wrapper };
