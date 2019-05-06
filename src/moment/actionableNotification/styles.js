import styled from 'styled-components';
import { Wrapper as NotificationWrapper } from '../notification/styles';

const ActionableContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ActionableWrapper = styled(NotificationWrapper)`
  padding: ${props => props.isCompact ? '0' : '8px 0'};
  
  ${ActionableContainer} {
    border: 1px solid ${props => props.theme.colors.gray10};
    border-radius: 2px;
    padding: ${props => props.isCompact ? '1px 0' : '4px 0'};
  }
`;

const AcceptButton = styled.button`
  color: ${props => props.theme.colors.primary};
  border: none;
  margin-right: 8px;
  padding: 8px;
  background-color: transparent;
  font-weight: 500;
  font-size: ${props => props.isCompact ? '14px' : '16px'};
`;

const AcceptedText = styled.div`
  font-size: ${props => props.isCompact ? '14px' : '16px'};
  margin-right: 16px;
  display:${props => props.hide ? 'none' : 'initial'};
`;

export {
  ActionableWrapper,
  AcceptButton,
  AcceptedText,
  ActionableContainer,
};
