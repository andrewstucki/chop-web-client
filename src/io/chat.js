// @flow
import Pubnub from 'pubnub';
import { Dispatch  } from 'redux';
import {
  loadHistory,
  setSalvations,
  SET_CHANNELS,
  joinChannel,
  addChannelSubscriber,
  removeChannelSubscriber,
} from '../feed/dux';
import {getReactions} from '../reactions/reactionsContainer/dux';
import {
  removeHereNow,
  setHereNow,
  addHereNow,
  hasPermissions,
  receiveMuteSubscriber,
  getMutedSubscribers,
  getSharedSubscriber,
} from '../subscriber/dux';
import type {
  ReactionType,
} from '../reactions/reactionButton/dux';
import Converter from './converter';
import type { MomentType } from '../moment/dux';
import { receiveMoment } from '../moment/dux';
import { receiveAcceptedPrayerRequest } from '../moment/actionableNotification/dux';
import {
  receiveLeftChannelNotification,
  receiveJoinedChannelNotification,
  receiveMuteSubscriberNotification,
  receivePrayerNotification,
} from '../moment/notification/dux';
import { deleteMessage } from '../moment/message/dux';
import {
  publishSalvation,
  salvationMomentExists,
} from '../anchorMoment/dux';
import {
  getLegacyChannel,
  getHostChannel,
  getPublicChannel,
  getCurrentChannel,
} from '../selectors/channelSelectors';
import { getMessageTimestamp } from '../util';
import type {
  PubnubReciveMessageType,
  LegacyNewMessageType,
} from './converter';
import bugsnagClient from '../util/bugsnag';
import type { ChopStateType } from '../chop/dux';

type PubnubStatusEventType = {
  affectedChannelGroups: Array<string>,
  affectedChannels: Array<string>,
  subscribedChannels: Array<string>,
  category: string,
  operation: string,
  lastTimetoken: string,
  currentTimetoken: string,
}

type PubnubPresenceEventStateType = {
  available_prayer: boolean, // eslint-disable-line camelcase
  nickname: string,
}

type PubnubPresenceEventType = {
  action : string,
  channel : string,
  occupancy : number,
  state : PubnubPresenceEventStateType,
  channelGroup : string,
  publishTime : number,
  timetoken : number,
  uuid : string,
}

type LegacyReactionType = {
  type: 'REACTION',
  nickname: string,
  channelToken: string,
  reactionId: string,
}

type LegacyMessageType = {
  messageText: string,
  language: string,
  eventTimeId: string,
  eventTimeOffset: string,
  eventTitle: string,
  uniqueMessageToken: string,
  fromNickname: string,
  fromToken: string,
  msgId: string,
  timestamp: string,
  fromAvatar: string,
  isHost: boolean,
  label: string,
  isVolunteer: boolean,
  isSubscriber: boolean,
  subscriberId: string,
  organizationId: string,
  organizationName: string,
  roomType: string,
  channelToken: string,
  eventStartTime: string,
};

type LegacyDeleteMessageType = {
  umt: string,
  channelToken: string,
}

type LegacyMuteSubscriberType = {
  nickname: string,
  fromNickname: string,
  channelToken: string,
  timestamp: string,
}

type LegacyLeaveChannelType = {
  messageText: string,
  timestamp: string,
  subscriberId: string,
  fromNickname: string,
  type: string,
  roomType: string,
  channelToken: string,
  timestamp: string,
};

type LegacyAcceptPrayerRequestType = {
  timestamp: number,
  hostName: string,
  guestName: string,
}

type LegacyPrayerNotificationType = {
  messageText: string,
  hostName: string,
  guestName: string,
  channel: string,
  timestamp: string,
  fromNickname: string,
}

type LegacyPollVoteType = {
  slideId: string,
  slideKind: string,
  count: number,
}

type PubnubMessageEventDataType =
  | MomentType
  | LegacyReactionType
  | LegacyMessageType
  | LegacyDeleteMessageType
  | LegacyMuteSubscriberType
  | LegacyLeaveChannelType
  | LegacyAcceptPrayerRequestType
  | LegacyPrayerNotificationType
  | LegacyPollVoteType;

export type PubnubMessageEventType = {
  channel: string,
  message: {
    action: string,
    data: PubnubMessageEventDataType,
  },
  publisher: string,
  subscription: string,
  timetoken: string,
}

type PubnubPublishMessageType = {
  channel: string,
  message: {
    action: string,
    channel: string,
    data: any,
  }
}

class Chat {
  pubnub: Pubnub;
  storeDispatch: Dispatch;
  getState: () => ChopStateType;
  previousLanguage: string | null;

  constructor (dispatch: Dispatch, getState: () => ChopStateType) {
    // $FlowFixMe
    this.onStatus = this.onStatus.bind(this);
    // $FlowFixMe
    this.onMessage = this.onMessage.bind(this);
    // $FlowFixMe
    this.onPresence = this.onPresence.bind(this);
    // $FlowFixMe
    this.loadHistory = this.loadHistory.bind(this);
    // $FlowFixMe
    this.publish = this.publish.bind(this);
    // $FlowFixMe
    this.publishReaction = this.publishReaction.bind(this);
    // $FlowFixMe
    this.publishDeleteMessage = this.publishDeleteMessage.bind(this);
    // $FlowFixMe
    this.receivePollVote = this.receivePollVote.bind(this);
    // $FlowFixMe
    this.init = this.init.bind(this);

    this.storeDispatch = dispatch;
    this.getState = getState;

    this.previousLanguage = null;
  }

  init () {
    const state = this.getState();

    if (this.pubnub ||
        !(state.feed.pubnubKeys.publish &&
          state.feed.pubnubKeys.subscribe &&
          state.subscriber.currentSubscriber.id)) {
      return;
    }

    this.pubnub = new Pubnub(
      {
        publishKey: state.feed.pubnubKeys.publish,
        subscribeKey: state.feed.pubnubKeys.subscribe,
        authKey: state.subscriber.currentSubscriber.pubnubAccessKey,
        uuid: state.subscriber.currentSubscriber.id,
      }
    );

    this.pubnub.addListener(
      {
        status: this.onStatus,
        message: this.onMessage,
        presence: this.onPresence,
      }
    );
  }

  setPubnubState () {
    const { subscriber: { currentSubscriber: { avatar, nickname }}, feed: { currentLanguage: language, channels }} = this.getState();
    const channelList = Object.keys(channels);
    if (channelList.length > 0) { // Don't set the state before channels have loaded
      this.pubnub.setState(
        {
          channels: channelList,
          state: {
            available_help: true, // eslint-disable-line camelcase
            available_prayer: true, // eslint-disable-line camelcase
            avatar,
            clientIp: '205.236.56.99',
            country_name: 'United States', // eslint-disable-line camelcase
            lat: 35.6500,
            lon: -97.4214,
            nickname,
            subscriberId: null,
            language,
          },
        },
        (status, _response) => {
          if (status.error) {
            bugsnagClient.notify(`Pubnub Error with setState: message: ${status.message}, type: ${status.type}`);
          }
        }
      );
    }
  }

  onStatus (event: PubnubStatusEventType) {
    switch (event.category) {
      case 'PNConnectedCategory':
        this.setPubnubState();
        this.storeDispatch({
          type: 'CHAT_CONNECTED',
        });
        return;
    }
  }

  loadHistory (messages: Array<any>, channel: string) {
    const moments = [];
    const hostChannel = getHostChannel(this.getState());
    messages.map(message => {
      switch (message.entry.action) {
        case 'newMessage': {
          const {fromNickname, channelToken, timestamp, label} = message.entry.data;
          if (message.entry.data.type === 'system') {
            moments.push(receiveLeftChannelNotification(fromNickname, channelToken, getMessageTimestamp(timestamp), label).moment);
          } else if (message.entry.data.type === 'joinedChannel') {
            moments.push(receiveJoinedChannelNotification(fromNickname, channelToken, getMessageTimestamp(timestamp), label).moment);
          } else {
            moments.push(Converter.legacyNewMessageToCwcMessage(message.entry.data));
          }
          return;
        }
        case 'newLiveResponseRequest':
          /* TODO: Update this to loop through remaining messages and see if there is a 'removeLiveResponseRequest'
              for this channel. If there is, do nothing, if there isn't, publish a pending prayer request.
          if (message.entry.data.type === 'prayer') {
            moments.push(Converter.legacyToCwcPrayer(message.entry).moment);
          }
          */
          return;
        case 'muteMessage':
          moments.splice(moments.findIndex(moment => moment.id === message.entry.data.umt));
          return;
        case 'muteSubscriber': {
          const mutedSubscribers = getMutedSubscribers(this.getState());
          const { nickname, fromNickname, timestamp } = message.entry.data;
          const { subscriber: { currentSubscriber: { nickname:currentSubscriberName }}} = this.getState();

          if (!mutedSubscribers.includes(nickname) && currentSubscriberName !== nickname) {
            this.storeDispatch(
              receiveMuteSubscriber(nickname)
            );

            if (channel === hostChannel) {
              moments.push(
                receiveMuteSubscriberNotification(
                  fromNickname,
                  nickname,
                  hostChannel,
                  getMessageTimestamp(timestamp)
                ).moment);
            }
          }
          return;
        }
        case 'livePrayerAccepted': {
          const hostChannel = getHostChannel(this.getState());
          moments.push(
            receivePrayerNotification(message.entry.data.hostName, message.entry.data.guestName, hostChannel, getMessageTimestamp(message.entry.data.timestamp)).moment
          );
          return;
        }
        case 'pollVote':
          this.receivePollVote(message.entry.data);
          return;
      }
    });

    this.storeDispatch(
      loadHistory(moments, channel)
    );
  }

  onPresence (event: PubnubPresenceEventType) {
    const { action, channel, uuid } = event;

    switch (action) {
      case 'join':
        this.storeDispatch(
          addHereNow(
            channel,
            this.filterSubscriberState(event),

          )
        );
        break;
      case 'timeout':
      case 'leave':
        this.storeDispatch(
          removeHereNow(channel, uuid)
        );
        break;
    }
  }

  onMessage (event: PubnubReciveMessageType<LegacyNewMessageType>) {
    const { feed: { channels }} = this.getState();
    let hasMomentBeenRecieved = false;
    switch (event.message.action) {
      case 'newMessage': {
        const message = event.message.data;
        const { subscriber: { currentSubscriber: { nickname:currentSubscriberName }}} = this.getState();
        if (message.type === 'system') {
          if (message.fromNickname !== currentSubscriberName) {
            this.storeDispatch(
              receiveLeftChannelNotification(message.fromNickname, message.channelToken, getMessageTimestamp(message.timestamp), message.label),
            );
            this.storeDispatch(
              removeChannelSubscriber(message.channelToken, message.fromToken),
            );
          }
        } else if (message.type === 'joinedChannel') {
          if (message.fromNickname !== currentSubscriberName) {
            const { fromToken, fromNickname, fromAvatar, label } = message;
            this.storeDispatch(
              receiveJoinedChannelNotification(message.fromNickname, message.channelToken, getMessageTimestamp(message.timestamp), message.label),
            );
            this.storeDispatch(
              addChannelSubscriber(message.channelToken, getSharedSubscriber(fromToken, fromNickname, fromAvatar, label)),
            );
          }
        } else {
          hasMomentBeenRecieved = Object.keys(channels).find(
            id => channels[id].moments.find(
              moment => moment.id === event.message.data.msgId));

          if (!hasMomentBeenRecieved) {
            const moment = Converter.legacyNewMessageToCwcMessage(event.message.data);

            if (moment.text) {
              this.storeDispatch(
                receiveMoment(event.channel, Converter.legacyNewMessageToCwcMessage(event.message.data))
              );
            }
          }
        }
        return;
      }
      case 'muteSubscriber': {
        const mutedSubscribers = getMutedSubscribers(this.getState());
        // $FlowFixMe
        const { nickname, fromNickname, timestamp } = event.message.data;
        const { subscriber: { currentSubscriber: { nickname:currentSubscriberName }}} = this.getState();

        if (!mutedSubscribers.includes(nickname) && currentSubscriberName !== nickname) {
          this.storeDispatch(
            receiveMuteSubscriber(nickname)
          );

          if (currentSubscriberName !== fromNickname) {
            this.storeDispatch(
              receiveMuteSubscriberNotification(
                fromNickname,
                nickname,
                getHostChannel(this.getState()),
                getMessageTimestamp(timestamp)
              )
            );
          }
        }
        return;
      }
      case 'videoReaction': {
        // $FlowFixMe
        if (getReactions(this.getState()).find(reaction => event.message.data.reactionId === reaction.id) === undefined) {
          this.storeDispatch(
            {
              type: 'RECEIVE_REACTION',
              reaction: {
                type: 'REACTION',
                // $FlowFixMe
                id: event.message.data.reactionId,
              },
            }
          );
        }
        return;
      }
      case 'newLiveResponseRequest':
        if (event.message.data.type === 'prayer' && event.message.data.transfer !== 'true') {
          if (hasPermissions(this.getState(), ['feed.direct.accept'], true)) {
            this.storeDispatch(
              Converter.legacyToCwcPrayer(event.message)
            );
          } else {
            this.storeDispatch(
              Converter.legacyToCwcPrayerNotification(event.message)
            );
          }
        }
        return;
      case 'muteMessage': {
        const { channelToken, umt } = event.message.data;
        const { feed: { channels }} = this.getState();

        if (channels[channelToken]) {
          const { moments } = channels[channelToken];
          if (moments.find(moment => moment.id === umt) !== undefined) {
            this.storeDispatch(
              deleteMessage(umt, channelToken)
            );
          }
        }
        return;
      }
      case 'removeLiveResponseRequest': {
        const cancelled = !!event.message.data.leave;
        const hostChannel = getHostChannel(this.getState());
        this.storeDispatch(
        // $FlowFixMe
          receiveAcceptedPrayerRequest(event.message.data.channel, hostChannel, cancelled)
        );
        return;
      }
      case 'livePrayerAccepted': {
        const hostChannel = getHostChannel(this.getState());
        this.storeDispatch(
        // $FlowFixMe
          receivePrayerNotification(event.message.data.hostName, event.message.data.guestName, hostChannel, getMessageTimestamp(event.message.data.timestamp))
        );
        return;
      }
      case 'pollVote':
        this.receivePollVote(event.message.data);
        return;
      case 'newDirectResponseRequest': {
        const { channel, requesterPubnubToken: requesterId, requesterNickname } = event.message.data;
        this.storeDispatch(
          joinChannel(channel, requesterId, requesterNickname)
        );
        return;
      }
    }
  }

  publish (message:PubnubPublishMessageType) {
    this.pubnub.publish(
      message
    );
  }

  publishReaction (reaction: ReactionType, channelId: string) {
    this.publish(
      {
        channel: channelId,
        message: {
          action: 'videoReaction',
          channel: channelId,
          data: Converter.cwcToLegacyReaction(reaction, channelId),
        },
      }
    );
  }

  subscribe (channels: Array<string>) {
    if (!this.pubnub) {
      return;
    }
    this.pubnub.subscribe (
      {
        channels,
        withPresence: true,
      }
    );
  }

  unsubscribe (channels: Array<string>) {
    this.pubnub.unsubscribe (
      {
        channels,
      }
    );
  }

  publishDeleteMessage (id: string, channelId: string) {
    this.publish(
      {
        channel: channelId,
        message: {
          action: 'muteMessage',
          channel: channelId,
          data: {
            umt: id,
            channelToken: channelId,
          },
        },
      }
    );
  }

  receivePollVote (data:LegacyPollVoteType) {
    if (data.slideKind === 'Salvation') {
      const publicChannel = getPublicChannel(this.getState());
      if (salvationMomentExists(this.getState(), publicChannel)) {
        this.storeDispatch(
          setSalvations(data.count)
        );
      } else {
        this.storeDispatch(
          setSalvations(data.count),
        );
        this.storeDispatch(
          publishSalvation(publicChannel),
        );
      }
    }
  }

  hereNow (id:string) {
    const includeState = getHostChannel(this.getState()) === id;
    this.pubnub.hereNow(
      {
        channels: [id],
        includeState,
      },
      (status, results) => {
        if (results) {
          const { occupants } = results.channels[id];
          const hereNowSubscribers = occupants.map(subscriber => this.filterSubscriberState(subscriber));
          this.storeDispatch(setHereNow(id, hereNowSubscribers));
        }
      }
    );
  }

  filterSubscriberState (subscriber:PubnubPresenceEventType) {
    if (subscriber.state) {
      // Only keep available_prayer attribute for now
      const available_prayer = subscriber.state ? subscriber.state.available_prayer : false; // eslint-disable-line camelcase
      return {
        id: subscriber.uuid,
        state: {
          available_prayer: available_prayer, // eslint-disable-line camelcase
        },
      };
    } else {
      return {
        id: subscriber.uuid,
        state: {},
      };
    }
  }

  addChannel = (channelId: string) => {
    this.subscribe([channelId]);
    this.pubnub.history({channel: channelId},
      ((status, response) => {
        if (!status?.error) {
          this.loadHistory(response.messages, channelId);
        } else {
          bugsnagClient.notify(new Error('Pubnub History failed to load'), { metaData: status });
        }
      }).bind(this));

    this.hereNow(channelId);
  }

  dispatch (action: any) {
    if (!action || !action.type) {
      return;
    }
    switch (action.type) {
      case 'SET_SUBSCRIBER':
        this.init();
        this.subscribe([action.subscriber.id]);
        return;
      case 'SET_PUBNUB_KEYS':
        this.init();
        return;
      case 'SET_LANGUAGE':
      case 'SET_AVATAR':
      case 'SET_AVAILABLE_FOR_PRAYER':
        this.setPubnubState();
        return;
      case 'ADD_CHANNEL':
        if (!action.channel.placeholder) {
          this.addChannel(action.channel.id);
        }
        return;
      case 'PUBLISH_REACTION':
        this.publishReaction(action.reaction, getLegacyChannel(this.getState()));
        return;
      case 'REMOVE_CHANNEL':
        this.unsubscribe([action.channel]);
        return;
      case SET_CHANNELS:
        Object.keys(action.channels).forEach(this.addChannel);
        return;
      case 'PUBLISH_DELETE_MESSAGE': {
        const currentChannel = getCurrentChannel(this.getState());
        this.publishDeleteMessage(action.id, currentChannel);
        return;
      }
    }
  }
}

export default Chat;
export type { PubnubPublishMessageType };
