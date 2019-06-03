// @flow
import React from 'react';
import { DirectChatAvatar } from '../components/styles';
import { getFirstInitial } from '../util';

type DirectChatIconProps = {
  isCurrent: boolean,
  nickname: string,
};

const DirectChatIcon = ( { isCurrent, nickname }:DirectChatIconProps ) => (
  <DirectChatAvatar isCurrent={isCurrent} nickname={nickname}>
    { getFirstInitial(nickname) }
  </DirectChatAvatar>
);
export default React.memo < DirectChatIconProps > (DirectChatIcon);
