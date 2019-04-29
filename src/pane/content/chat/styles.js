import styled from 'styled-components';

const ChatInputs = styled.div`
  position: relative;
  width: 100%;
`;

const PlaceholderWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex-direction: column;
`;

const PlaceholderText = styled.div`
  margin-top: 8px;
  color: ${props => props.theme.colors.gray50};
  font-size: 13.44px;
`;

export { ChatInputs, PlaceholderWrapper, PlaceholderText };
