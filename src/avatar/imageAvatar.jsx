// @flow
import React from 'react';
import { Image } from './styles';
import type { AvatarSizeType } from './index';

type ImageAvatarProps = {
  url: string,
  size: AvatarSizeType,
  id: string,
};

const ImageAvatar = ({url, size, id}:ImageAvatarProps) => (
  <Image
    size={size}
    src={url}
    data-testid={id}
  >
  </Image>
);

export default React.memo < ImageAvatarProps > (ImageAvatar);
