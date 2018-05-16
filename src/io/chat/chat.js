// @flow

type ChatEngine = {

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

  constructor (engine: ChatEngineCore) {
    this.chatEngineCore = engine;
  }

  setKeys (publishKey: string, subscribeKey: string): void {
    this.chatEngine = this.chatEngineCore.create(
      {
        publishKey,
        subscribeKey,
      }
    );
  }
}

export default Chat;
export type { Chat };