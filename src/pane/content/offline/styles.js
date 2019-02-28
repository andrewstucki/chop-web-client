import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => props.theme.colors.disabled};
`;

const Heading = styled.p`
  text-transform: uppercase;
  color: ${props => props.theme.colors.gray50};
  margin-bottom: 1rem;
  font-size: 0.75rem;
`;

const EventName = styled.p`
  font-weight: bold;
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
`;

export {
  Wrapper,
  Heading,
  EventName,
};
