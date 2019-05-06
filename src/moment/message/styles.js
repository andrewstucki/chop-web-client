import styled from 'styled-components';
import LabelWrapper from '../../components/label/styles';

const MessageWrapper = styled.div`
  width: 100%;
  min-height: ${props => props.isCompact ? '24px' : '40px'};
  display: flex;
  flex-direction: row;
  flex: 1;
  overflow: hidden;
`;

const ActionableWrapper = styled.div`
  padding: 5px 4px 5px;
  width: 100%;
  background: ${props => props.messageTrayOpen ? props.theme.colors.gray5 : props.theme.colors.background};
  display: flex;
  border-radius: 16px;
  flex-direction: column;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  padding: ${props => props.hasPermissions ? '0' : '5px 4px 5px'};
  
  ${LabelWrapper} {
    display: inline-block;
    position: relative;
    bottom: 1px;
    left: 4px;
    margin-right: 3px;
  }

  div {
    -webkit-tap-highlight-color: transparent;
  }

`;

const BodyWrapper = styled.div`
  flex: 1;
  margin: 0 8px;
  color: ${props => props.theme.colors.gray100};
`;

const NameWrapper = styled.strong`
  font-weight: bold;
  font-size: 13.44px;
  line-height: 1.25;
  color: ${props => props.theme.colors.gray50};
`;

const TextWrapper = styled.div`
  line-height: 1.25;
  overflow-wrap: break-word;
  word-break: break-word;
  display: ${props => props.isCompact ? 'inline' : 'block'};
  font-size: ${props => props.isCompact ? '15px' : '16px'};
  margin-left: ${props => props.isCompact ? '8px' : '0px'};
`;

export {
  MessageWrapper,
  ActionableWrapper,
  Wrapper,
  BodyWrapper,
  NameWrapper,
  TextWrapper,
};

