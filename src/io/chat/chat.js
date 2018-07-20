// @flow
import type { MomentType } from '../../moment';
import { MESSAGE } from '../../moment';
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
};

type Me = {

};

type ChatEngine = {
  connect: (
    uuid: string,
    state: Object,
  ) => Me,
  Chat: (channel: string) => ChatType,
  on: (event: string, (data: Object) => void) => void
};

type ChatEngineCore = {
  create: (pnConfig: {
    publishKey: string,
    subscribeKey: string,
  }) => ChatEngine
};

type AddToChannel = (
  channelId: string,
  moment: MomentType
) => void;

class Chat {
  // Type Definitions
  chatEngineCore: ChatEngineCore
  chatEngine: ChatEngine
  me: Me
  chats: {
    [string]: ChatType,
  }
  addToChannel: AddToChannel
  userId: string


  constructor (
    engine: ChatEngineCore,
    addToChannel: AddToChannel
  ) {
    this.chatEngineCore = engine;
    this.chats = {};
    this.addToChannel = addToChannel;
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

  validCommand (data: Object): boolean {
    return data instanceof Object;
  }

  receiveMessage (channelId: string, message: MomentType): void {
    if (this.validMessage(message)) {
      this.addToChannel(channelId, message);
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

  addChat (channelId: string, channelToken: string): void {
    if (!this.chatEngine /*|| !this.me*/) return;
    const chat = this.chatEngine.Chat(channelToken);
    chat.on(
      'message',
      payload => {
        if (payload.sender.uuid !== this.userId) {
          if (channelId === 'public' ||
            channelId === 'host' || channelId === 'direct') {
            this.receiveMessage(channelId, payload.data);
          } else {
            this.receiveCommand(channelId, payload.data);
          }
        }
      }
    );
    this.chats[channelId] = chat;
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

export default Chat;
export type { Chat };
