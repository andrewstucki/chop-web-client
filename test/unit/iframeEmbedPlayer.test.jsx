// @flow
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import IframeEmbedPlayer from '../../src/videoFeed/players/iframeEmbedPlayer';

Enzyme.configure({ adapter: new Adapter() });

describe('IframeEmbedPlayer tests', () => {
  test('renders an iframe with the given URL', () => {
    const wrapper = Enzyme.shallow(
      <IframeEmbedPlayer
        url='https://youtube.com/embed/123456'
        style='style'
      />
    );

    expect(wrapper.find('iframe').exists()).toBeTruthy();
    expect(wrapper.find('iframe[src="https://youtube.com/embed/123456"]').exists()).toBeTruthy();
  });
});
