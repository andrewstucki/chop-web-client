import styled from 'styled-components';
import LabelWrapper from '../../components/label/styles';
import { animated } from 'react-spring';

const MessageWrapper = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  background: #fff;
  overflow: hidden;
  padding: 8px 0 8px;
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
  }
`;

const BodyWrapper = styled.div`
  flex: 1;
  margin: 1px 8px 0;
  color: ${props => props.theme.colors.gray100};
`;

const NameWrapper = styled.strong`
  font-weight: bold;
  font-size: 13.44px;
  line-height: 1.25;
`;

const OpenTrayButton = styled.button`
  line-height: 0;
  padding: 0 8px;
  border: none;
  background-color: #fff;
  outline-style: none;
  
  svg {
    width: 15px;
  }
`;

const TextWrapper = styled.div`
  line-height: 1.25;
  overflow-wrap: break-word;
  word-break: break-word;
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

