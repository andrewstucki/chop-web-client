// @flow
import React from 'react';
import type {IFramePlayerPropsType } from '../dux';

const IframeEmbedPlayer = ({style, url}: IFramePlayerPropsType) => (
  <iframe
    className={style}
    src={url}
    width="100%"
    frameBorder={0}
    marginWidth={0}
    marginHeight={0}
  ></iframe>
);

export default IframeEmbedPlayer;
