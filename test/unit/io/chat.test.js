// @flow
import Chat from '../../../src/io/chat/chat';
import getReducer, {
  setChatKeys,
  setUser,
  defaultState,
} from '../../../src/io/chat/dux';

import { chatInput, addToCurrentChannel } from '../../../src/chat/dux';
// TODO write a test for acceptPrayerRequest and update everyone's feed
// import { acceptPrayerRequest } from '../../../src/moment/actionableNotification/dux';

import {
  changeChannel,
  addChannel,
} from '../../../src/feed/dux';

import { MESSAGE } from '../../../src/moment/dux';

describe('Chat IO reducer test', () => {
  let chat;
  let reducer;

  beforeEach(() => {
    chat = {
      setKeys: jest.fn(),
      setUser: jest.fn(),
      addChat: jest.fn(),
      publish: jest.fn(),
    };

    const mock = (mockObject: any): Chat => mockObject;

    reducer = getReducer(mock(chat));
  });

  test('set chat keys', () => {
    const result = reducer(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {},
        chatInput: '',
        currentChannel: 'default',
      },
      setChatKeys('12345', '67890')
    );
    expect(result).toEqual(
      {
        publishKey: '12345',
        subscribeKey: '67890',
        user: {
          id: '',
          nickname: '',
        },
        chats: {},
        chatInput: '',
        currentChannel: 'default',
      }
    );
    expect(chat.setKeys.mock.calls.length).toBe(1);
    expect(chat.setKeys.mock.calls[0][0]).toEqual('12345');
    expect(chat.setKeys.mock.calls[0][1]).toEqual('67890');
  });

  test('set user', () => {
    const result = reducer(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {},
        chatInput: '',
        currentChannel: 'default',
      },
      setUser('12345', 'Billy Bob')
    );
    expect(result).toEqual(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        },
        chats: {},
        chatInput: '',
        currentChannel: 'default',
      }
    );
    expect(chat.setUser.mock.calls.length).toBe(1);
    expect(chat.setUser.mock.calls[0][0]).toEqual('12345');
    expect(chat.setUser.mock.calls[0][1]).toEqual('Billy Bob');
  });

  test('add chat', () => {
    const result = reducer(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {},
        chatInput: '',
        currentChannel: 'default',
      },
      addChannel('default', '12345')
    );
    expect(result).toEqual(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {
          default: '12345',
        },
        chatInput: '',
        currentChannel: 'default',
      }
    );
    expect(chat.addChat.mock.calls.length).toBe(1);
    expect(chat.addChat.mock.calls[0][0]).toEqual('default');
    expect(chat.addChat.mock.calls[0][1]).toEqual('12345');
  });

  test('chat input', () => {
    const result = reducer(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {},
        chatInput: '',
        currentChannel: 'default',
      },
      chatInput('Hello buddy'),
    );
    expect(result).toEqual(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {},
        chatInput: 'Hello buddy',
        currentChannel: 'default',
      }
    );
  });

  test('change current channel', () => {
    const result = reducer(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {
          default: '12345',
          host: '67890',
        },
        chatInput: 'Hello buddy',
        currentChannel: 'default',
      },
      changeChannel('host'),
    );
    expect(result).toEqual(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {
          default: '12345',
          host: '67890',
        },
        chatInput: 'Hello buddy',
        currentChannel: 'host',
      }
    );
  });

  test('add to current channel', () => {
    const result = reducer(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {
          default: '12345',
          host: '67890',
        },
        chatInput: 'Hello buddy',
        currentChannel: 'default',
      },
      addToCurrentChannel(),
    );
    expect(result).toEqual(
      {
        publishKey: '',
        subscribeKey: '',
        user: {
          id: '',
          nickname: '',
        },
        chats: {
          default: '12345',
          host: '67890',
        },
        chatInput: '',
        currentChannel: 'default',
      }
    );
    expect(chat.publish.mock.calls.length).toBe(1);
    expect(chat.publish.mock.calls[0][0]).toEqual('default');
    expect(chat.publish.mock.calls[0][1].text).toEqual('Hello buddy');
  });

  test('publish prayer request moment to channel', () => {
    const action = () => {};
    const result = reducer(
      defaultState,
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'host',
        moment: {
          type: 'ACTIONABLE_NOTIFICATION',
          notificationType: 'PRAYER_REQUEST',
          id: '12345',
          user: {
            id: '12345',
            nickname: 'Willaim Wallace',
          },
          active: true,
          timeStamp: '4:53pm',
          action: action,
        },
      }
    );
    expect(result).toEqual(defaultState);
    expect(chat.publish.mock.calls.length).toBe(2);
    expect(chat.publish.mock.calls[0][0]).toEqual('request');
    expect(chat.publish.mock.calls[0][1]).toEqual(
      {
        type: 'ACTIONABLE_NOTIFICATION',
        notificationType: 'PRAYER_REQUEST',
        id: '12345',
        user: {
          id: '12345',
          nickname: 'Willaim Wallace',
        },
        active: true,
        timeStamp: '4:53pm',
        action: action,
      }
    );
  });
});


describe('Chat IO Interface test', () => {
  let mockedEngineCore;
  let mockedChatEngine;
  let mockedMe;
  let mockedChat;

  beforeEach(() => {
    mockedChat = {
      emit: jest.fn(),
      on: jest.fn(),
      invite: jest.fn(),
    };
    mockedMe = {
      uuid: '5432',
      state: {
        nickname: 'Carl',
      },
    };
    mockedChatEngine = {
      connect: jest.fn().mockReturnValue(mockedMe),
      Chat: jest.fn().mockReturnValue(mockedChat),
      on: jest.fn(),
      global: {
        users: {
          userId: {
            uuid: '12345',
            state: {
              nickname: 'Bill',
            },
          },
        },
      },
    };
    mockedEngineCore = {
      create: jest.fn().mockReturnValue(mockedChatEngine),
    };
  });

  test('initializes with a chatEngine', () => {
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    expect(chat.chatEngineCore).toBe(mockedEngineCore);
  });

  test('set keys', () => {
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    chat.setKeys('12345', '67890');
    expect(mockedEngineCore.create.mock.calls.length).toBe(1);
    expect(mockedEngineCore.create.mock.calls[0][0]).toEqual(
      {
        publishKey: '12345',
        subscribeKey: '67890',
      }
    );
  });

  test('set user does not work unless keys are set', () => {
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    chat.setUser('12345', 'Billy Bob');
    expect(mockedChatEngine.connect.mock.calls.length).toBe(0);
  });

  test('set user', () => {
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    chat.setKeys('12345', '67890');
    chat.setUser('12345', 'Billy Bob');
    expect(mockedChatEngine.connect.mock.calls.length).toBe(1);
  });

  test('add chat does not work unless keys', () => {
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    chat.addChat('default', '12345');
    expect(mockedChatEngine.Chat.mock.calls.length).toBe(0);
  });

  test('add chat', () => {
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    chat.setKeys('12345', '67890');
    chat.setUser('12345', 'Billy Bob');
    chat.addChat('default', '12345');
    expect(mockedChatEngine.Chat.mock.calls.length).toBe(1);
    expect(mockedChatEngine.Chat.mock.calls[0][0]).toEqual('12345');
  });

  test('publish dose not work without chat, engine or user', () => {
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});

    chat.publish('default', {
      type: MESSAGE,
      id: '12345',
      text: 'Hello, world!',
      neverRendered: true,
      user: {
        id: '12345',
        nickname: 'Billy Bob',
      },
      messageTrayOpen: false,
    });
    expect(mockedChat.emit.mock.calls.length).toBe(0);

    chat.setKeys('12345', '67890');
    chat.publish('default', {
      type: MESSAGE,
      id: '12345',
      text: 'Hello, world!',
      neverRendered: true,
      user: {
        id: '12345',
        nickname: 'Billy Bob',
      },
      messageTrayOpen: false,
    });
    expect(mockedChat.emit.mock.calls.length).toBe(0);

    chat.setUser('12345', 'Billy Bob');
    chat.publish('default', {
      type: MESSAGE,
      id: '12345',
      text: 'Hello, world!',
      neverRendered: true,
      user: {
        id: '12345',
        nickname: 'Billy Bob',
      },
      messageTrayOpen: false,
    });
    expect(mockedChat.emit.mock.calls.length).toBe(0);
  });

  test('publish message', () => {
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    chat.setKeys('12345', '67890');
    chat.setUser('12345', 'Billy Bob');
    chat.addChat('default', '12345');
    chat.publish('default', {
      type: MESSAGE,
      id: '12345',
      text: 'Hello, world!',
      neverRendered: true,
      user: {
        id: '12345',
        nickname: 'Billy Bob',
      },
      messageTrayOpen: false,
    });
    expect(mockedChat.emit.mock.calls.length).toBe(1);
    expect(mockedChat.emit.mock.calls[0][0]).toEqual('message');
    expect(mockedChat.emit.mock.calls[0][1]).toEqual(
      {
        id: '12345',
        text: 'Hello, world!',
        neverRendered: true,
        user: {
          id: '12345',
          nickname: 'Billy Bob',
        },
        messageTrayOpen: false,
      },
    );
  });

  test('publish prayerRequestNotification', () => {
    const action = () => {};
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    chat.setKeys('12345', '67890');
    chat.setUser('12345', 'William Wallace');
    chat.addChat('request', '12345');
    chat.publish('request', {
      type: 'ACTIONABLE_NOTIFICATION',
      notificationType: 'PRAYER_REQUEST',
      id: '12345',
      user: {
        id: '12345',
        nickname: 'William Wallace',
      },
      timeStamp: '4:53pm',
      active: true,
      action: action,
    });
    expect(mockedChat.emit.mock.calls.length).toBe(1);
    expect(mockedChat.emit.mock.calls[0][0]).toEqual('message');
    expect(mockedChat.emit.mock.calls[0][1]).toEqual(
      {
        type: 'ACTIONABLE_NOTIFICATION',
        notificationType: 'PRAYER_REQUEST',
        id: '12345',
        user: {
          id: '12345',
          nickname: 'William Wallace',
        },
        timeStamp: '4:53pm',
        active: true,
        action: action,
      }
    );
  });

  test('validate message', () => {
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    expect(chat.validMessage(
      {
        type: 'MESSAGE',
        id: '599465b0-23c2-42a7-b837-298e8a51c94f',
        text: 'Hello, world!',
        user: {
          id: '599465b0-23c2-42a7-b837-298e8a51c94a',
          nickname: 'Billy Bob',
        },
        messageTrayOpen: false,
      }
    )).toBe(true);
  });

  test('validate prayer notification', () => {
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    expect(chat.validNotification(
      {
        type: 'NOTIFICATION',
        notificationType: 'PRAYER',
        id: '599465b0-23c2-42a7-b837-298e8a51c94f',
        host: 'Billy Bob',
        guest: 'Jackie',
        timeStamp: '4:53pm',
      }
    )).toBe(true);
  });
  
  // TODO
  // test('receive message', () => {
  //   const addToChannel = jest.fn();
  //   const chat = new Chat(mockedEngineCore, addToChannel, () => {}, () => {});
  //   chat.setKeys('12345', '67890');
  //   chat.setUser('bb', 'Billy Bob');
    
  //   let cb = payload => {}; /* eslint-disable-line no-unused-vars */
  //   mockedChat.on = (event, callback) => {
  //     cb = callback;
  //   };

  //   chat.addChat('public', '67890');
    
  //   cb(
  //     {
  //       sender: {
  //         uuid: '599465b0-23c2-42a7-b837-298e8a51c94a',
  //       },
  //       data: {
  //         type: 'MESSAGE',
  //         id: '599465b0-23c2-42a7-b837-298e8a51c94f',
  //         text: 'Hello, world!',
  //         user: {
  //           id: '599465b0-23c2-42a7-b837-298e8a51c94a',
  //           nickname: 'Billy Bob',
  //         },
  //         messageTrayOpen: false,
  //       },
  //     }
  //   );

  //   expect(addToChannel.mock.calls.length).toBe(1);
  //   expect(addToChannel.mock.calls[0][0]).toEqual('public');
  //   expect(addToChannel.mock.calls[0][1]).toEqual(
  //     {
  //       type: 'MESSAGE',
  //       id: '599465b0-23c2-42a7-b837-298e8a51c94f',
  //       text: 'Hello, world!',
  //       user: {
  //         id: '599465b0-23c2-42a7-b837-298e8a51c94a',
  //         nickname: 'Billy Bob',
  //       },
  //       messageTrayOpen: false,
  //     }
  //   );
  // });

  // TODO
  // test('receive prayerRequestNotification', () => {
  //   const action = () => {};
  //   const addToChannel = jest.fn();
  //   const chat = new Chat(mockedEngineCore, addToChannel);
  //   chat.setKeys('12345', '67890');
  //   chat.setUser('bb', 'Billy Bob');
  //   chat.addChat('request', '67890');
    
  //   let cb = payload => payload; /* eslint-disable-line no-unused-vars */
  //   mockedChat.on('message', {
  //     sender: {
  //       uuid: '599465b0-23c2-42a7-b837-298e8a51c94a',
  //     },
  //     data: {
  //       type: 'ACTIONABLE_NOTIFICATION',
  //       notificationType: 'PRAYER_REQUEST',
  //       id: '599465b0-23c2-42a7-b837-298e8a51c94f',
  //       user: {
  //         id: '599465b0-23c2-42a7-b837-298e8a51c94a',
  //         nickname: 'Billy Bob',
  //       },
  //       timeStamp: '4:53pm',
  //       active: true,
  //       action: action,
  //     },
  //   });

  //   expect(addToChannel.mock.calls.length).toBe(1);
  //   expect(addToChannel.mock.calls[0][0]).toEqual('host');
  //   expect(addToChannel.mock.calls[0][1]).toEqual(
  //     {
  //       type: 'ACTIONABLE_NOTIFICATION',
  //       notificationType: 'PRAYER_REQUEST',
  //       id: '599465b0-23c2-42a7-b837-298e8a51c94f',
  //       user: {
  //         id: '599465b0-23c2-42a7-b837-298e8a51c94a',
  //         nickname: 'Billy Bob',
  //       },
  //       timeStamp: '4:53pm',
  //       active: true,
  //       action: action,
  //     },
  //   );
  // });

  test('receive malformed message', () => {
    const addToChannel = jest.fn();
    const chat = new Chat(mockedEngineCore, addToChannel, () => {}, () => {});
    chat.setKeys('12345', '67890');
    chat.setUser('bb', 'Billy Bob');

    
    let cb = payload => {}; /* eslint-disable-line no-unused-vars */
    mockedChat.on = (event, callback) => {
      cb = callback;
    };

    chat.addChat('public', '67890');
    
    cb(
      {
        sender: {
          uuid: '599465b0-23c2-42a7-b837-298e8a51c94a',
        },
        data: {
          hey: 'I am not a message',
          reject: true,
        },
      }
    );

    expect(addToChannel.mock.calls.length).toBe(0);
  });

  test('invite to channel', () => {
    const addChannel = jest.fn();
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, addChannel);
    chat.setKeys('12345', '67890');
    chat.setUser('bb', 'Billy Bob');
    chat.addChat('fake-chat', 'fake-chat');
    chat.inviteToChannel('userId', 'fake-chat');
    expect(mockedChat.invite.mock.calls.length).toBe(1);
    expect(mockedChat.invite.mock.calls[0][0]).toBe(mockedChatEngine.global.users.userId);
  });
});
