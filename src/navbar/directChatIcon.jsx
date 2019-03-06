// @flow
import React from 'react';
import { DirectChatAvatar } from './styles';
import { getFirstInitial } from '../util';

type DirectChatIconProps = {
  isCurrent: boolean,
  name: string,
};

const DirectChatIcon = ( { isCurrent, name }:DirectChatIconProps ) => (
  <DirectChatAvatar isCurrent={isCurrent} name={name}>
    { getFirstInitial(name) }
  </DirectChatAvatar>
);

export default React.memo < DirectChatIconProps > (DirectChatIcon);
