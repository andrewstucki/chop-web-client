// @flow
import Chat from '../../../src/io/chat/chat';
import getReducer, {
  setChatKeys,
  setUser,
} from '../../../src/io/chat/dux';
// TODO write a test for acceptPrayerRequest and update everyone's feed
// import { acceptPrayerRequest } from '../../../src/moment/actionableNotification/dux';

import { addChannel } from '../../../src/feed/dux';

import { MESSAGE } from '../../../src/moment/dux';

const otherUser = {
  pubnubToken: '12345',
  name: 'Billy Bob',
  role: {
    label: '',
  },
};
const currentUser = {
  id: '12345',
  pubnubToken: '09876',
  pubnubAccessToken: '67890',
  name: 'Joan Jet',
  role: {
    label: '',
    permissions: [],
  },
};

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
    reducer(
      {},
      setChatKeys('12345', '67890')
    );
    expect(chat.setKeys.mock.calls.length).toBe(1);
    expect(chat.setKeys.mock.calls[0][0]).toEqual('12345');
    expect(chat.setKeys.mock.calls[0][1]).toEqual('67890');
  });

  test('set user', () => {
    reducer(
      {},
      setUser(currentUser)
    );
    expect(chat.setUser.mock.calls.length).toBe(1);
    expect(chat.setUser.mock.calls[0][0]).toBe(currentUser);
  });

  test('add chat', () => {
    reducer(
      {},
      addChannel('default', '12345')
    );
    expect(chat.addChat.mock.calls.length).toBe(1);
    expect(chat.addChat.mock.calls[0][0]).toEqual('default');
    expect(chat.addChat.mock.calls[0][1]).toEqual('12345');
  });

  test('add to current channel', () => {
    reducer(
      {},
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'public',
        moment: {
          type: 'MESSAGE',
          id: '12345',
          text: 'Hello buddy',
          user: otherUser,
          messageTrayOpen: false,
          closeTrayButtonRendered: false,
        },
      },
    );
    expect(chat.publish.mock.calls.length).toBe(1);
    expect(chat.publish.mock.calls[0][0]).toEqual('public');
    expect(chat.publish.mock.calls[0][1].text).toEqual('Hello buddy');
  });

  test('publish prayer request moment to channel', () => {
    const action = () => {};
    reducer(
      {},
      {
        type: 'PUBLISH_MOMENT_TO_CHANNEL',
        channel: 'host',
        moment: {
          type: 'ACTIONABLE_NOTIFICATION',
          notificationType: 'PRAYER_REQUEST',
          id: '12345',
          user: otherUser,
          active: true,
          timeStamp: '4:53pm',
          action: action,
        },
      }
    );
    expect(chat.publish.mock.calls.length).toBe(1);
    expect(chat.publish.mock.calls[0][0]).toEqual('request');
    expect(chat.publish.mock.calls[0][1]).toEqual(
      {
        type: 'ACTIONABLE_NOTIFICATION',
        notificationType: 'PRAYER_REQUEST',
        id: '12345',
        user: otherUser,
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
        name: 'Carl',
        role: { label: '' },
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
              name: 'Bill',
              role: { label: '' },
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
    chat.setUser(currentUser);
    expect(mockedChatEngine.connect.mock.calls.length).toBe(0);
  });

  test('set user', () => {
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    chat.setKeys('12345', '67890');
    chat.setUser(currentUser);
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
    chat.setUser(currentUser);
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
      user: otherUser,
      messageTrayOpen: false,
    });
    expect(mockedChat.emit.mock.calls.length).toBe(0);

    chat.setKeys('12345', '67890');
    chat.publish('default', {
      type: MESSAGE,
      id: '12345',
      text: 'Hello, world!',
      neverRendered: true,
      user: otherUser,
      messageTrayOpen: false,
    });
    expect(mockedChat.emit.mock.calls.length).toBe(0);

    chat.setUser(currentUser);
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
    chat.setUser(currentUser);
    chat.addChat('default', '12345');
    chat.publish('default', {
      type: MESSAGE,
      id: '12345',
      text: 'Hello, world!',
      neverRendered: true,
      user: otherUser,
      messageTrayOpen: false,
    });
    expect(mockedChat.emit.mock.calls.length).toBe(1);
    expect(mockedChat.emit.mock.calls[0][0]).toEqual('message');
    expect(mockedChat.emit.mock.calls[0][1]).toEqual(
      {
        id: '12345',
        text: 'Hello, world!',
        neverRendered: true,
        user: otherUser,
        messageTrayOpen: false,
      },
    );
  });

  test('publish prayerRequestNotification', () => {
    const action = () => {};
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    chat.setKeys('12345', '67890');
    chat.setUser(currentUser);
    chat.addChat('request', '12345');
    chat.publish('request', {
      type: 'ACTIONABLE_NOTIFICATION',
      notificationType: 'PRAYER_REQUEST',
      id: '12345',
      user: otherUser,
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
        user: otherUser,
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
          pubnubToken: '599465b0-23c2-42a7-b837-298e8a51c94a',
          name: 'Billy Bob',
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

  test('validate left chat notification', () => {
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    expect(chat.validNotification(
      {
        type: 'NOTIFICATION',
        notificationType: 'LEFT_CHAT',
        id: '599465b0-23c2-42a7-b837-298e8a51c94f',
        name: 'Jim',
        timeStamp: '9:33pm',
      }
    )).toBe(true);
  });

  test('validate prayer request notification', () => {
    const chat = new Chat(mockedEngineCore, () => {}, () => {}, () => {});
    expect(chat.validCommand(
      {
        type: 'ACTIONABLE_NOTIFICATION',
        notificationType: 'PRAYER_REQUEST',
        id: '599465b0-23c2-42a7-b837-298e8a51c94f',
        user: {
          pubnubToken: '12345',
          name: 'Billy Bob',
        },
        timeStamp: '4:53pm',
        active: true,
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
    chat.setUser(currentUser);

    
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
    chat.setUser(currentUser);
    chat.addChat('fake-chat', 'fake-chat');
    chat.inviteToChannel('userId', 'fake-chat');
    expect(mockedChat.invite.mock.calls.length).toBe(1);
    expect(mockedChat.invite.mock.calls[0][0]).toBe(mockedChatEngine.global.users.userId);
  });
});
