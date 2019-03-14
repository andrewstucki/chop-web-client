import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  background-color: rgba(255, 255, 255, 0.95);
  height: 48px;
  width: 100%;
  position: absolute;
  z-index: 1;
  padding-left: 1rem;
  line-height: 20px;
`;

const Title = styled.div`
  color: ${props => props.theme.colors.gray100};
  font-size: 16px;
  font-weight: 500;
`;

export { Wrapper, Title };
