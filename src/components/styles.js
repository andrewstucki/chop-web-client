import styled from 'styled-components';
import {getAvatarColor} from '../util';


const DirectChatAvatar = styled.div`
  border-radius: 24px;
  height: 28px;
  width: 28px;
  font-size: 12px;
  color: ${props => props.theme.colors.alternateTextColor};
  text-align: center;
  line-height: 28px;
  background-color: ${ props =>  getAvatarColor(props.name, props.isCurrent ? 1.0 : 0.5) };
`;

export {
  DirectChatAvatar,
};