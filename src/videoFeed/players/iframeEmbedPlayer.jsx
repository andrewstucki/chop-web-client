// @flow
import React from 'react';
import type {IFramePlayerPropsType } from '../dux';

const IframeEmbedPlayer = ({url}: IFramePlayerPropsType) => (
  <iframe
    src={url}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
    }}
    width='100%'
    height='100%'
    frameBorder={0}
    marginWidth={0}
    marginHeight={0}
    data-testid='iframePlayer'
  ></iframe>
);

export default React.memo < IFramePlayerPropsType > (IframeEmbedPlayer);
