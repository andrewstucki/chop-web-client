// @flow
import React from 'react';
import { DirectChatAvatar } from '../components/styles';
import { getFirstInitial } from '../util';
import Icon from '../icons/chat';

type DirectChatIconProps = {
  isCurrent: boolean,
  nickname: string,
};

const DirectChatIcon = ( { isCurrent, nickname }:DirectChatIconProps ) => (
  <>
    { nickname === 'Direct' || nickname === 'Prayer' ?
      <DirectChatAvatar isCurrent={isCurrent} nickname={nickname} pending={true}>
        <Icon size={12} color={'#FFFFFF'} large={false}/>
      </DirectChatAvatar> :
      <DirectChatAvatar isCurrent={isCurrent} nickname={nickname}>
        { getFirstInitial(nickname) }
      </DirectChatAvatar>
    }
  </>
  
);
export default React.memo < DirectChatIconProps > (DirectChatIcon);
