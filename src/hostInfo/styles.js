import styled from 'styled-components';

const Wrapper = styled.div`
  padding: 48px 16px 24px 16px;
  overflow-x: scroll;
  height: 100%;
  
  iframe {
    overflow: hidden;
    max-width: 455px;
    max-height: 256px;
    margin: 1rem 0;
  }
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
