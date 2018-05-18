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

  receive (channelId: string, message: MessageType): void {
    this.addToChannel(channelId, message);
  }

  addChat (channelId: string, channelToken: string): void {
    if (!this.chatEngine /*|| !this.me*/) return;
    const chat = this.chatEngine.Chat(channelToken);
    chat.on(
      'message',
      payload => {
        if (payload.sender.uuid !== this.userId) {
          this.receive(channelId, payload.data);
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