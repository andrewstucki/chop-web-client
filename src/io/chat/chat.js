// @flow
import type { MessageType } from '../../chat/dux';


type ChatType = {
  emit: (
    event: string,
    meta: Object
  ) => void,
  on: (
    event: string,
    cb: (
      event: string,
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
  Chat: (channel: string) => ChatType
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
    this.me = this.chatEngine.connect(id, {
      nickname,
    });
  }

  receive (channelId: string, event: string, payload: Object): void {
    this.addToChannel(channelId, payload);
  }

  addChat (channelId: string, channelToken: string): void {
    if (!this.chatEngine || !this.me) return;
    const chat = this.chatEngine.Chat(channelToken);
    chat.on(
      'message',
      (event, payload) => {
        this.receive(channelId, event, payload);
      }
    );
    this.chats[channelId] = chat;
  }

  publish (channel: string, message: MessageType): void {
    if (!this.chatEngine ||
      !this.me ||
      !this.chats[channel]) {
        return;
      }
    this.chats[channel].emit('message', message);
  }
}

export default Chat;
export type { Chat };