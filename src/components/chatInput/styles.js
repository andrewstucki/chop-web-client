import styled from 'styled-components';

const ChatInput = styled.input`
  border: none;
  color: ${props => props.theme.colors.textColor};
  height: 20px;
  flex: 1;
  background-color: transparent;
  outline: none;
  padding: 0px;
  margin: 0 8px 0 0;
  
  &::placeholder {
    color: ${props => props.theme.colors.gray50};
  }
`;

export default ChatInput;
