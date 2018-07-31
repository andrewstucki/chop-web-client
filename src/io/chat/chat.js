// @flow
import type { MomentType } from '../../moment';
import type { UserType } from '../../feed/dux';
import {
  MESSAGE,
  PRAYER,
} from '../../moment';
import {
  PRAYER_REQUEST,
  ACTIONABLE_NOTIFICATION,
} from '../../moment/actionableNotification/dux';


type ChatType = {
  emit: (
    event: string,
    meta: Object
  ) => void,
  on: (
    event: string,
    cb: (
      payload: Object,
    ) => void
  ) => void,
  invite: MeType => void;
};

type MeType = {
  uuid: string,
  state: {
    nickname: string,
  },
};

type ChatEngineType = {
  connect: (
    uuid: string,
    state: Object,
  ) => MeType,
  Chat: (channel: string) => ChatType,
  on: (event: string, (data: Object) => void) => void,
  global: {
    users: {
      [string]: MeType
    }
  }
};

type ChatEngineCoreType = {
  create: (pnConfig: {
    publishKey: string,
    subscribeKey: string,
  }) => ChatEngineType
};

type AddToChannelType = (
  channelId: string,
  moment: MomentType
) => void;

class Chat {
  // Type Definitions
  chatEngineCore: ChatEngineCoreType
  chatEngine: ChatEngineType
  me: MeType
  chats: {
    [string]: ChatType,
  }
  addToChannel: AddToChannelType
  userId: string
  addChannel: (
    channelName: string,
    channelId: string,
    participants?: Array<UserType>
  ) => void
  receiveAcceptedPrayerRequest: (id: string) => void;

  constructor (
    engine: ChatEngineCoreType,
    addToChannel: AddToChannelType,
    addChannel: (channelName: string, channelId: string) => void,
    receiveAcceptedPrayerRequest: (id: string) => void
  ) {
    this.chatEngineCore = engine;
    this.chats = {};
    this.addToChannel = addToChannel;
    this.addChannel = addChannel;
    this.receiveAcceptedPrayerRequest = receiveAcceptedPrayerRequest;
  }

  setKeys (publishKey: string, subscribeKey: string): void {
    this.chatEngine = this.chatEngineCore.create(
      {
        publishKey,
        subscribeKey,
      }
    );
  }

  setUser (id: string, nickname: string): void {
    if (!this.chatEngine) return;
    this.userId = id;
    this.chatEngine.on ('$.ready', data => {
      this.me = data.me;
      this.me.direct.on('$.invite', payload => {
        const currentUser = {
          id: this.me.uuid,
          nickname: this.me.state.nickname,
        };
        const otherUser = {
          id: payload.sender.uuid,
          nickname: payload.sender.state.nickname,
        };

        this.addChannel(
          payload.data.channel,
          payload.data.channel,
          [currentUser, otherUser]
        );
      });
    });
    this.chatEngine.connect(id, {
      nickname,
    });
  }

  isString (str: string): boolean {
    return typeof(str) === 'string' || str instanceof String;
  }

  validMessage (message: MomentType): boolean {
    return message.type === MESSAGE &&
      this.isString(message.text) &&
      message.text.length > 0 &&
      this.isString(message.id) &&
      message.id.length === 36 &&
      message.user instanceof Object &&
      this.isString(message.user.id) &&
      // FIXME: when we connect to real users
      // our fake users have the wrong length id
      //message.user.id.length === 36 &&
      this.isString(message.user.nickname) &&
      message.user.nickname.length > 0;
  }

  validNotification (notification: MomentType): boolean {
    switch (notification.notificationType) {
    case PRAYER:
      return this.isString(notification.timeStamp) &&
        notification.timeStamp.length > 0 &&
        this.isString(notification.host) &&
        notification.host.length > 0 &&
        this.isString(notification.guest) &&
        notification.guest.length > 0 &&
        this.isString(notification.id) &&
        notification.id.length === 36;
    }
    return false;
  }

  validCommand (data: Object): boolean {
    // TODO validate commands
    return data instanceof Object;
  }

  receiveMoment (channelId: string, moment: MomentType): void {
    if (this.validMessage(moment) || this.validNotification(moment)) {
      this.addToChannel(channelId, moment);
    }
  }

  receiveCommand (channelId: string, data: MomentType): void {
    if (this.validCommand(data)) {
      switch (data.type) {
      case ACTIONABLE_NOTIFICATION: {
        if (data.notificationType === PRAYER_REQUEST) {
          this.addToChannel('host', data);
        }
        return;
      }
      default:
        //do nothing
      }
    }
  }

  addChat (channelName: string, channelId: string): void {
    if (!this.chatEngine /*|| !this.me*/) return;
    const chat = this.chatEngine.Chat(channelId);
    chat.on(
      'message',
      payload => {
        if (payload.sender.uuid !== this.userId) {
          if (channelName !== 'request' || channelName !== 'command') {
            this.receiveMoment(channelName, payload.data);
          } 

          if (channelName === 'request' || channelName === 'command') {
            this.receiveCommand(channelName, payload.data);
          }
        }
      }
    );
    chat.on('accepted', payload => {
      if (payload.sender.uuid !== this.userId) {
        this.receiveAcceptedPrayerRequest(payload.id);
      }
    });
    this.chats[channelName] = chat;
  }

  inviteToChannel (userId: string, channelName: string): void {
    const privateChat = this.chats[channelName];
    const otherUser = this.chatEngine.global.users[userId];
    privateChat.invite(otherUser);
  }

  publishAcceptedPrayerRequest (id: string, channelName: string): void {
    const requestId = { id };
    this.chats[channelName].emit('accepted', requestId);
  }

  publish (channel: string, moment: MomentType): void {
    if (!this.chatEngine ||
      // !this.me ||
      !this.chats[channel]) {
      return;
    }
    this.chats[channel].emit('message', moment);
  }
}

export type { Chat };

export default Chat;
