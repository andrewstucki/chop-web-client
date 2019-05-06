import styled, { css } from 'styled-components';
import { Wrapper as NotificationWrapper } from '../notification/styles';

const ActionableContainer = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const ActionableWrapper = styled(NotificationWrapper)`
  padding: 8px 0;
  
  ${ActionableContainer} {
    border: 1px solid ${props => props.theme.colors.gray10};
    border-radius: 2px;
    padding: 4px 0;
  }
`;

const AcceptButton = styled.button`
  color: ${props => props.theme.colors.primary};
  border: none;
  margin-right: 8px;
  padding: 8px;
  background-color: transparent;
  font-weight: 500;
`;

const AcceptedText = styled.div`
  display: initial;
  font-size: 16px;
  margin-right: 16px;
  ${props => props.hide && css`display: none;`}
`;

export { ActionableWrapper, ActionableContainer, AcceptButton, AcceptedText };
