import styled from 'styled-components';
import LabelWrapper from '../../components/label/styles';
import { animated } from 'react-spring';

const MessageWrapper = styled.div`
  width: 100%;
  min-height: ${props => props.isCompact ? '24px' : '40px'};
  display: flex;
  background: #fff;
  overflow: hidden;
  padding: 5px 0 5px;
  transition: opacity 300ms cubic-bezier(0.7, 0, 0.3, 1);
  opacity: ${props => props.messageTrayOpen ? '0.5' : '1.0'};
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  
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

const OpenTrayButton = styled.button`
  line-height: 0;
  padding: 0 4px;
  border: none;
  background-color: #fff;
  outline-style: none;
  -webkit-tap-highlight-color: transparent;
  position: relative;
  height: ${props => props.isCompact ? '24px' : '40px'};
  align-self: center;
  
  svg {
    width: 20px;
    position: relative;
  }

  &:active:before {
    content: '';
    position: absolute;
    border-radius: 100%;
    left: 50%;
    margin-left: -16px;
    top: 50%;
    margin-top: -16px;
    width: 32px;
    height: 32px;
    background: ${props => props.theme.colors.gray10};
  }

  
`;

const TextWrapper = styled.div`
  line-height: 1.25;
  overflow-wrap: break-word;
  word-break: break-word;
  display: ${props => props.isCompact ? 'inline' : 'block'};
  font-size: ${props => props.isCompact ? '15px' : '16px'};
  margin-left: ${props => props.isCompact ? '8px' : '0px'};
`;

const AnimatedMessageTray = styled(animated.div)`
  position: absolute;
  right: 0;
`;

export {
  MessageWrapper,
  Wrapper,
  BodyWrapper,
  NameWrapper,
  OpenTrayButton,
  TextWrapper,
  AnimatedMessageTray,
};

