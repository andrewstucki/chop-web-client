import styled from 'styled-components';

const ComingSoonWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const ComingSoonText = styled.div`
  margin-top: 8px;
  color: ${props => props.theme.colors.gray50};
`;

export { ComingSoonWrapper, ComingSoonText };
