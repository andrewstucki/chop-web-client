import styled from 'styled-components';

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  box-sizing: border-box;
  background-color: white;
  padding: 16px;
  height: 64px;
  line-height: 20px;
`;

const EventInfo = styled.div`
  white-space: nowrap;
  overflow: hidden;
  margin-right: 8px;
`;

const Title = styled.div`
  font-size: 16px;
  font-weight: bold;
  color: ${props => props.theme.colors.textColor};
`;

const Description = styled.div`
  font-size: 13px;
  color: ${props => props.theme.colors.textColor};
`;

const CountdownWrapper = styled.div`
  margin-left: auto;
  color: ${props => props.theme.colors.gray50};
`;

export { Wrapper, EventInfo, Title, Description, CountdownWrapper };
