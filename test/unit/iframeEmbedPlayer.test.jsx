// @flow
import { render } from 'react-testing-library';
import React from 'react';
import IframeEmbedPlayer from '../../src/videoFeed/players/iframeEmbedPlayer';

describe('IframeEmbedPlayer tests', () => {
  test('renders an iframe with the given URL', () => {
    const { container } = render(
      <IframeEmbedPlayer
        url='https://youtube.com/embed/123456'
        style='style'
      />
    );

    const iframe = container.querySelector('iframe');

    expect(iframe).toBeTruthy();
    expect(iframe.getAttribute('src')).toEqual('https://youtube.com/embed/123456');
  });
});
