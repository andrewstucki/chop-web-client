import styled from 'styled-components';

const Container = styled.div`
  width: 100%; 
  background-color: ${props => props.theme.colors.black};
`;

const OuterWrapper = styled.div`
  max-width: 455px;
  margin: 0 auto; 
  height: 100%; 
  width: 100%;
`;

const InnerWrapper = styled.div`
  display: ${props => props.hidden ? 'none' : 'block'};
  position: relative;
  z-index: 2;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  
  @media only screen and (max-height: 400px) {
    display: none;
  }
`;

export { Container, OuterWrapper, InnerWrapper };
