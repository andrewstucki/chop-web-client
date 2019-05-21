import styled from 'styled-components';

const PublicChatDisabled = styled.div`
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

export { PublicChatDisabled };