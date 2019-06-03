// @flow
import React from 'react';
import sinon from 'sinon';
import { renderWithReduxAndTheme } from '../../testUtils';
import { fireEvent } from 'react-testing-library';
import { defaultState } from '../../../src/chop/dux';

import MessageTray from '../../../src/components/messageTray';

describe('MessageTray tests', () => {
  test('MessageTray has buttons', () => {
    const { queryByTestId } = renderWithReduxAndTheme(
      <MessageTray
        deleteMessage={() => {}}
        muteSubscriber={() => {}}
        directChat={() => {}}
        isCompact={true}
        messageTrayOpen={true}
        chatPermissions={true}
        moderationPermissions={true}
      />
    );
    expect(queryByTestId('messageTray')).toBeTruthy();
  });

  test('Can click delete and mute', () => {
    const deleteMessage = sinon.spy();
    const muteSubscriber = sinon.spy();
    const { queryByTestId } = renderWithReduxAndTheme(
      <MessageTray
        deleteMessage={deleteMessage}
        muteSubscriber={muteSubscriber}
        directChat={() => {}}
        isCompact={true}
        messageTrayOpen={true}
        chatPermissions={false}
        moderationPermissions={true}
      />,
      {
        subscriber: {
          ...defaultState.subscriber,
          currentSubscriber: {
            ...defaultState.subscriber.currentSubscriber,
            role: {
              label: 'Host',
              permissions: ['feed.subscriber.mute', 'feed.message.delete'],
            },
          },
        },
      }
    );
    fireEvent.click(queryByTestId('deleteButton'));
    fireEvent.click(queryByTestId('muteButton'));
    expect(deleteMessage.calledOnce).toEqual(true);
    expect(muteSubscriber.calledOnce).toEqual(true);
  });

  test('Can click direct chat', () => {
    const directChat = sinon.spy();
    const { queryByTestId } = renderWithReduxAndTheme(
      <MessageTray
        deleteMessage={() => {}}
        muteSubscriber={() => {}}
        directChat={directChat}
        isCompact={true}
        messageTrayOpen={true}
        chatPermissions={true}
        moderationPermissions={false}
      />,
      {
        subscriber: {
          ...defaultState.subscriber,
          currentSubscriber: {
            ...defaultState.subscriber.currentSubscriber,
            role: {
              label: 'Host',
              permissions: ['feed.direct.create'],
            },
          },
        },
      }
    );
    fireEvent.click(queryByTestId('directChatButton'));
    expect(directChat.calledOnce).toEqual(true);
  });
});
