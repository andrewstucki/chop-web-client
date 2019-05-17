import styled from 'styled-components';
import {getAvatarColor} from '../util';


const DirectChatAvatar = styled.div`
  border-radius: 50%;
  height: 20px;
  width: 20px;
  font-size: 10.72px;
  color: ${props => props.theme.colors.alternateTextColor};
  text-align: center;
  line-height: 20px;
  background-color: ${ props =>  getAvatarColor(props.name, props.isCurrent ? 1.0 : 0.5) };
`;

export {
  DirectChatAvatar,
};
