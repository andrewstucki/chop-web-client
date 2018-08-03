// @flow
import type { FeedType, UserType } from '../feed/dux';

// Flow Type Definitions

type ChannelType = {
  id: string,
  isCurrent: boolean,
  hasActions: boolean,
  directChatParticipants?: Array<UserType>,
  otherUserName?: string,
};

type ChannelsListType = Array<ChannelType>;

// Selectors

const getChannels = (state: FeedType): ChannelsListType => (
  Object.keys(state.channels).filter(
    id => id !== 'request' && id !== 'command'
  ).map(id => {
    const { participants, moments } = state.channels[id];
    let otherUserName = [];

    const filterCurrentUser = users => (
      users.filter(user =>
        user.id !== state.currentUser.id
      )
    );

    if (participants && participants.length === 2) {
      const [ user ] = filterCurrentUser(participants);
      otherUserName.push(user.nickname);
    }

    const getOtherUsers = () => {
      if (participants && participants.length > 2) {
        otherUserName = [];
        return filterCurrentUser(participants);
      }
    };

    return {
      id,
      isCurrent: state.currentChannel === id,
      hasActions: moments.filter(moment => (
        moment.type === 'ACTIONABLE_NOTIFICATION' && moment.active === true
      )).length > 0,
      directChatParticipants: getOtherUsers(),
      otherUserName: otherUserName[0],
    };
  })
);

// Exports

export {
  getChannels,
};
export type {
  ChannelType,
};
