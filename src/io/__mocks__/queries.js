import testData from '../../../test/unit/io/test-data.json';

const currentState = jest.fn().mockResolvedValue(testData);
const acceptPrayer = jest.fn().mockResolvedValue(
  {
    acceptPrayer: {
      name: 'Direct',
      id: '12345',
      type: 'direct',
      direct: true,
      subscribers: [
        {
          id: '123',
          avatar: null,
          nickname: 'James T. Kirk',
        },
        {
          id: '456',
          avatar: null,
          nickname: 'Will Brown',
        },
      ],
    },
  },
);
const muteSubscriber = jest.fn().mockResolvedValue({muteSubscriber: true});
const leaveChannel = jest.fn().mockResolvedValue({leaveChannel: true});
const directChat = jest.fn().mockResolvedValue(
  {
    createDirectChannel: {
      direct: true,
      id: '67890',
      type: 'direct',
      name: null,
      subscribers: [
        {
          id: '123',
          nickname: 'Fred',
          avatar: null,
        },
        {
          id: '456',
          nickname: 'Barny',
          avatar: null,
        },
      ],
    },
  }
);

const joinChannel = jest.fn().mockResolvedValue(
  {
    joinChannel: {
      direct: true,
      id: '67890',
      type: 'direct',
      name: null,
      subscribers: [
        {
          id: '123',
          nickname: 'Kilo',
          avatar: null,
        },
        {
          id: '456',
          nickname: 'Darth',
          avatar: null,
        },
      ],
    },
  }
);

const eventAtTime = jest.fn();
const getSchedule = jest.fn();
const sequence = jest.fn().mockResolvedValue(
  {
    sequence: {
      serverTime: 1539966236,
      steps: [
        {
          fetchTime: 1542289491,
          query: ['feed'],
          transitionTime: 1542289492,
        },
        {
          fetchTime: 1542289493,
          query: ['event', 'video'],
          transitionTime: 1542289494,
        },
        {
          fetchTime: 1542289495,
          query: ['event', 'video', 'feed'],
          transitionTime: 1542289496,
        },
      ],
    },
  }
);

const updateSubscriber = jest.fn().mockResolvedValue(
  {
    updateSubscriber: {
      id: '128',
      nickname: 'Joe',
      avatar: null,
      pubnubAccessKey: '1234',
      role: {
        label: '',
        permissions: [],
      },
      preferences: {
        textMode: 'COMFORTABLE',
      },
    },
  }
);

const generatePdf = jest.fn().mockResolvedValue({
  generatePdf: 'https://cloud.google.com/openentwork/pdf1.pdf',
});

const resetPassword = jest.fn().mockResolvedValue({
  resetPassword: {
    success: true,
    errors: [],
  },
});

const requestPasswordReset = jest.fn().mockResolvedValue({
  requestPasswordReset: true,
});

const requestLivePrayer = jest.fn().mockResolvedValue({
  requestLivePrayer: {
    id: '123456',
    name: 'Prayer',
    type: 'prayer',
  },
});

const deleteSelf = jest.fn().mockResolvedValue({
  deleteSelf: true,
});

const channel = jest.fn().mockResolvedValue({
  channel: {
    subscriber: {
      avatar: null,
      nickname: 'guest', 
      id: '123abc',
      role: {
        label: '',
      },
    },
  },
});

const mockQueries = {
  currentState: currentState,
  acceptPrayer: acceptPrayer,
  muteSubscriber: muteSubscriber,
  leaveChannel: leaveChannel,
  directChat: directChat,
  eventAtTime: eventAtTime,
  schedule: getSchedule,
  sequence: sequence,
  joinChannel: joinChannel,
  updateSubscriber: updateSubscriber,
  generatePdf: generatePdf,
  resetPassword: resetPassword,
  requestPasswordReset: requestPasswordReset,
  deleteSelf: deleteSelf,
  requestLivePrayer: requestLivePrayer,
  channel: channel,
};

export {
  currentState,
  acceptPrayer,
  muteSubscriber,
  leaveChannel,
  directChat,
  eventAtTime,
  getSchedule,
  sequence,
  joinChannel,
  generatePdf,
  updateSubscriber,
  resetPassword,
  requestPasswordReset,
  requestLivePrayer,
  deleteSelf,
  channel,
};
export default mockQueries;
