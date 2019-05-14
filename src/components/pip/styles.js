import styled from 'styled-components';

const Dot = styled.div`
  height:8px;
  width:8px;
  border-radius: 50%;
  background-color: ${props => props.hasActions ? props.theme.colors.primary : props.theme.colors.gray50};
`;

export {
  Dot,
};