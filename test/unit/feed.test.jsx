// @flow
import React from 'react';
import { renderWithReduxAndTheme, renderWithTheme } from '../testUtils';
import { MESSAGE } from '../../src/moment';
import Feed from '../../src/feed/feed';
import type {PrivateUserType} from '../../src/users/dux';

describe('Feed tests', () => {
  const user: PrivateUserType = {
    pubnubToken: '12345',
    id: 1928374,
    avatar: null,
    pubnubAccessKey: '098765',
    name: 'Billy Bob',
    role: {
      label: '',
      permissions: [],
    },
    preferences: {
      textMode: 'COMPACT',
    },
  };

  const moments = [
    {
      type: MESSAGE,
      id: 'string',
      text: 'This is a message',
      sender: {
        id: '12345',
        name: 'Billy Bob',
      },
      messageTrayOpen: false,
    },
  ];

  test('has an empty feed', () => {
    const { getByTestId } = renderWithTheme(
      <Feed
        moments={[]}
        anchorMoments={[]}
        currentChannel="default"
        appendingMessage={false}
        showLeaveChat={true}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
        scroll={{type: 'NO_SCROLL'}}
        currentUser={user}
        updateScrollPosition={() => {}}
        channel="default"
        showNewMessageButton={false}
        focusedChannel=''
        setSawLastMomentAt={() => {}}
        textMode={'COMPACT'}
        t={text => text}
      />
    );
    expect(getByTestId('feed-momentList').children.length).toEqual(0);
  });

  test('has a single message', () => {
    const moments = [
      {
        type: MESSAGE,
        id: 'string',
        text: 'This is a message',
        sender: {
          id: '12345',
          name: 'Billy Bob',
        },
        messageTrayOpen: false,
      },
    ];
    
    const { getByTestId } = renderWithReduxAndTheme(
      <Feed
        offset={0}
        moments={moments}
        anchorMoments={[]}
        onMessageRender={function () {}}
        currentChannel="default"
        appendingMessage={false}
        showLeaveChat={true}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
        scroll={{type: 'NO_SCROLL'}}
        currentUser={user}
        updateScrollPosition={() => {}}
        channel="default"
        showNewMessageButton={false}
        focusedChannel=''
        setSawLastMomentAt={() => {}}
        textMode={'COMPACT'}
      />
    );

    expect(getByTestId('feed-momentList')).toBeTruthy();
    expect(getByTestId('feed-momentList').children[0].textContent).toEqual('BBillyThis is a message');
  });

  test('check for key prop', () => {
    const { getByTestId } = renderWithReduxAndTheme(
      <Feed
        offset={0}
        moments={moments}
        anchorMoments={[]}
        onMessageRender={function () {}}
        currentChannel="default"
        appendingMessage={false}
        showLeaveChat={true}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
        scroll={{type: 'NO_SCROLL'}}
        currentUser={user}
        updateScrollPosition={() => {}}
        channel="default"
        showNewMessageButton={false}
        focusedChannel=''
        setSawLastMomentAt={() => {}}
        textMode={'COMPACT'}
      />
    );
    expect(getByTestId('feed-momentList').children.length).toBe(1);
    expect(getByTestId('feed-momentList').children[0].textContent).toEqual('BBillyThis is a message');
  });

  test('Feed with New Message button', () => {
    const { getByTestId } = renderWithTheme(
      <Feed
        offset={0}
        moments={[]}
        anchorMoments={[]}
        onMessageRender={function () {}}
        currentChannel="host"
        appendingMessage={false}
        showLeaveChat={false}
        isPopUpModalVisible={false}
        togglePopUpModal={() => {}}
        scroll={{type: 'NO_SCROLL'}}
        currentUser={user}
        updateScrollPosition={() => {}}
        channel="default"
        showNewMessageButton={true}
        focusedChannel=''
        setSawLastMomentAt={() => {}}
        textMode={'COMPACT'}
      />
    );
    const button = getByTestId('feed-newMessages');
    expect(button).toBeTruthy();
    expect(button.textContent).toEqual('new_messages');
  });
});
