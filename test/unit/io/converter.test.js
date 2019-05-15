// @flow
import Converter from '../../../src/io/converter';
import { mockDate } from '../../testUtils';

describe('Converter Tests', () => {
  test('CWC to Legacy', () => {
    Converter.config(
      () => (
        {
          feed: {
            event: {
              id: '320418',
              eventTimeId: '3908134',
              startTime: 1548165600,
              title: 'When Pigs Fly - Week 2',
            },
            organization: {
              id: 2,
              name: 'Life.Church',
            },
            channels: {
              '6eaeb8f5f1f83018b5979f6254531ea9a46a48c20d3b117f857ba5c5ef10e9c7': {
                id: '6eaeb8f5f1f83018b5979f6254531ea9a46a48c20d3b117f857ba5c5ef10e9c7',
              },
            },
            currentLanguage: 'en',
          },
        }
      )
    );

    expect(
      Converter.cwcMessageToLegacyNewMessage(
        {
          type: 'MESSAGE',
          id: '80299c76-b08f-4700-b660-df8691969042',
          timestamp: 1548173995604,
          lang: 'en',
          text: 'Hello',
          messageTrayOpen: false,
          sender: {
            id: 1234567,
            name: 'Jackie Chan',
            avatar: null,
            pubnubToken: 'dabc0a3a-5251-4dc9-b877-78e789b4516e',
            role: {
              label: 'HOST',
            },
          },
          isMuted: false,
        },
        '6eaeb8f5f1f83018b5979f6254531ea9a46a48c20d3b117f857ba5c5ef10e9c7'
      )
    ).toEqual(
      {
        messageText: 'Hello',
        language: 'en',
        eventTimeId: '3908134',
        eventTimeOffset: '8395',
        eventTitle: 'When Pigs Fly - Week 2',
        uniqueMessageToken: '80299c76-b08f-4700-b660-df8691969042',
        fromNickname: 'Jackie Chan',
        fromToken: 'dabc0a3a-5251-4dc9-b877-78e789b4516e',
        msgId: '80299c76-b08f-4700-b660-df8691969042',
        timestamp: '2019-01-22T16:19:55.604Z',
        fromAvatar: 'https://s3.amazonaws.com/chop-v3-media/users/avatars/thumb/missing.png',
        isHost: true,
        label: 'HOST',
        isVolunteer: true,
        isUser: true,
        userId: 1234567,
        organizationId: 2,
        organizationName: 'Life.Church',
        platform: 'CWC',
        roomType: 'public',
        channelToken: '6eaeb8f5f1f83018b5979f6254531ea9a46a48c20d3b117f857ba5c5ef10e9c7',
        eventStartTime: 1548165600,
      }
    );
  });

  test('Legacy to CWC', () => {
    mockDate('2018-06-19 16:11:36 GMT-0000');

    Converter.config(
      () => (
        {
          event: {
            id: '320418',
            startTime: 1529425800000,
            title: 'When Pigs Fly - Week 2',
          },
          organization: {
            id: 2,
            name: 'Life.Church',
          },
          channels: {
            public: {
              id: '6eaeb8f5f1f83018b5979f6254531ea9a46a48c20d3b117f857ba5c5ef10e9c7',
            },
          },
        }
      )
    );

    expect(
      Converter.legacyNewMessageToCwcMessage(
        {
          messageText: 'Hello',
          language: 'en',
          eventTimeId: '320418',
          eventTimeOffset: '-1104000',
          eventTitle: 'When Pigs Fly - Week 2',
          uniqueMessageToken: '80299c76-b08f-4700-b660-df8691969042',
          fromNickname: 'Jackie Chan',
          fromToken: 'dabc0a3a-5251-4dc9-b877-78e789b4516e',
          msgId: '80299c76-b08f-4700-b660-df8691969042',
          timestamp: '2018-06-19T16:11:36Z',
          fromAvatar: '',
          isHost: true,
          label: 'HOST',
          isVolunteer: true,
          isUser: true,
          isMuted: false,
          userId: 1234567,
          organizationId: 2,
          organizationName: 'Life.Church',
          roomType: 'public',
          channelToken: '6eaeb8f5f1f83018b5979f6254531ea9a46a48c20d3b117f857ba5c5ef10e9c7',
          eventStartTime: 1529425800000,
        }
      )
    ).toEqual(
      {
        type: 'MESSAGE',
        id: '80299c76-b08f-4700-b660-df8691969042',
        timestamp: 1529424696000,
        lang: 'en',
        text: 'Hello',
        messageTrayOpen: false,
        isMuted: false,
        translations: [],
        sender: {
          id: 1234567,
          name: 'Jackie Chan',
          avatar: '',
          pubnubToken: 'dabc0a3a-5251-4dc9-b877-78e789b4516e',
          role: {
            label: 'HOST',
          },
        },
      },
    );
  });
});
