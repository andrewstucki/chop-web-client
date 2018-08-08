// @flow
import type { MomentType } from '../../moment';
import type { PrivateUserType, SharedUserType } from '../../feed/dux';
import {
  MESSAGE,
  PRAYER,
  PRAYER_REQUEST,
  ACTIONABLE_NOTIFICATION,
} from '../../moment';


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
    name: string,
    role: {
      label: string,
    }
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
    participants?: Array<SharedUserType>
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

  setUser (user: PrivateUserType): void {
    if (!this.chatEngine) return;
    this.userId = user.pubnubToken;
    this.chatEngine.on ('$.ready', data => {
      this.me = data.me;
      this.me.direct.on('$.invite', payload => {
        const currentUser = {
          pubnubToken: this.me.uuid,
          name: this.me.state.name,
          role: this.me.state.role,
        };
        const otherUser = {
          pubnubToken: payload.sender.uuid,
          name: payload.sender.state.name,
          role: payload.sender.state.role,
        };

        this.addChannel(
          payload.data.channel,
          payload.data.channel,
          [currentUser, otherUser]
        );
      });
    });
    this.chatEngine.connect(user.pubnubToken, {
      name: user.name,
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

  validCommand (command: MomentType): boolean {
    return command.notificationType === PRAYER_REQUEST &&
      this.isString(command.id) &&
      command.id.length === 36 &&
      this.isString(command.user.id) &&
      this.isString(command.user.nickname) &&
      command.user.nickname.length > 0 &&
      this.isString(command.timeStamp) &&
      command.timeStamp.length > 0 &&
      command.active.constructor === Boolean;
  }

  receiveMoment (channelId: string, moment: MomentType): void {
    if (this.validMessage(moment) || this.validNotification(moment)) {
      this.addToChannel(channelId, moment);
    }
  }

  receiveCommand (channelId: string, command: MomentType): void {
    if (this.validCommand(command)) {
      switch (command.type) {
      case ACTIONABLE_NOTIFICATION: {
        if (command.notificationType === PRAYER_REQUEST) {
          this.addToChannel('host', command);
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
        this.receiveAcceptedPrayerRequest(payload.data.id);
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
