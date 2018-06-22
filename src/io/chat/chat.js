// @flow
import type { MessageType } from '../../moment';
import { MESSAGE } from '../../moment';


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
}

type Me = {

}

type ChatEngine = {
  connect: (
    uuid: string,
    state: Object,
  ) => Me,
  Chat: (channel: string) => ChatType,
  on: (event: string, (data: Object) => void) => void
}

type ChatEngineCore = {
  create: (pnConfig: {
    publishKey: string,
    subscribeKey: string,
  }) => ChatEngine
};

class Chat {
  chatEngineCore: ChatEngineCore
  chatEngine: ChatEngine
  me: Me
  chats: {
    [string]: ChatType,
  }
  addToChannel: (
    channelId: string,
    message: MessageType
  ) => void
  userId: string

  constructor (
    engine: ChatEngineCore,
    addToChannel: (
      channelId: string,
      message: MessageType
    ) => void
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

  validMessage (message: MessageType): boolean {
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

  receiveMessage (channelId: string, message: MessageType): void {
    if (this.validMessage(message)) {
      this.addToChannel(channelId, message);
    }
  }

  receiveCommand (channelId: string, data: Object): void {
    if (this.validCommand(data)) {
      switch (data.type) {
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
          if (channelId === 'public') {
            this.receiveMessage(channelId, payload.data);
          } else {
            this.receiveCommand(channelId, payload.data);
          }
        }
      }
    );
    this.chats[channelId] = chat;
  }

  publish (channel: string, message: MessageType): void {
    if (!this.chatEngine ||
      // !this.me ||
      !this.chats[channel]) {
      return;
    }
    this.chats[channel].emit('message', message);
  }
}

export default Chat;
export type { Chat };
