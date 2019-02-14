import styled, { css } from 'styled-components';
import LabelWrapper from '../../components/label/styles';

type WrapperPropsType = {
  messageTrayOpen: boolean,
};

const MessageWrapper = styled.div`
  width: 100%;
  min-height: 40px;
  display: flex;
  background: #fff;
  overflow: hidden;
  padding: 8px 0 8px;
  transition: opacity 300ms cubic-bezier(0.7, 0, 0.3, 1);
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  
  ${(props:WrapperPropsType) => props.messageTrayOpen ?
    css`
    > :last-child {
      transition: right 300ms cubic-bezier(0.7, 0, 0.3, 1);
      right: 0;
    }
    
    ${MessageWrapper} {
      opacity: 0.25;
    }
    ` :
    css`
    > :last-child {
      transition: right 300ms cubic-bezier(0.7, 0, 0.3, 1);
      right: -300px;
    }`
}
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

export {
  MessageWrapper,
  Wrapper,
  BodyWrapper,
  NameWrapper,
  OpenTrayButton,
  TextWrapper,
};

