import styled from 'styled-components';

const Wrapper = styled.div`
  display: ${props => props.hidden ? 'none' : 'block'};
  position: relative;
  background-color: black;
  z-index: 2;
  padding-top: 56.25%; /* Player ratio: 100 / (1280 / 720) */
  
  @media only screen and (max-height: 400px) {
    display: none;
  }
`;

export { Wrapper };
