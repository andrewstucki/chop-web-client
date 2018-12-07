// @flow
import React from 'react';
import type { PlayerPropsType } from '../dux';

const IframeEmbedPlayer = ({style, url}: PlayerPropsType) => (
  <iframe
    className={style}
    src={url}
    width="100%"
    frameBorder="0"
  ></iframe>
);

export default IframeEmbedPlayer;