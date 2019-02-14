import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 48px 16px 24px 16px;
  overflow-x: scroll;
`;

const NoHostInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  p {
    color: ${props => props.theme.colors.gray30};
  }
  
  img {
    width: 114px;
    height: 92px;
  }
`;

export { Wrapper, NoHostInfo };
