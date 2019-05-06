import styled from 'styled-components';

const Wrapper = styled.div`
  display: ${props => props.messageTrayOpen ? 'flex' : 'none'};
  padding: ${props => {
    if (props.messageTrayOpen) {
      if (props.isCompact) {
        return '4px 0 0 26px';
      } else {
        return '4px 0 0 37px';
      } 
    } else {
      return '0';
    }
  }};
`;

const TrayButton = styled.button`
  border: none;
  cursor: pointer;
  background: ${props => props.theme.colors.gray5};
  color: ${props => props.theme.colors.primary};
  line-height: 17px;
  font-size: 13.44px;
`;

export { 
  Wrapper, 
  TrayButton,
};
