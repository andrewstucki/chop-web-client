import styled from 'styled-components';

const Wrapper = styled.span`
  color: white;
  background-color: ${props => props.theme.colors.gray50};
  border-radius: 12px;
  font-size: 10.24px;
  text-align: center;
  line-height: 13px;
  padding: 0 5px 0;
`;

export default Wrapper;
