// @flow
import React from 'react';
import Spinner from '../icons/spinner';
import type { AvatarSizeType } from './index';
import { Icon } from './styles';

type AvatarLoaderProps = {
  size: AvatarSizeType,
};

const AvatarLoader = ({ size }:AvatarLoaderProps) => (
  <Icon
    size={size}
    style={{background: 'rgba(45, 45, 46, 0.5)', position: 'absolute'}}
  >
    <Spinner/>
  </Icon>
);

export default AvatarLoader;
