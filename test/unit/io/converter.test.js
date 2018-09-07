// @flow
import Converter from '../../../src/io/converter';
import { mockDate } from '../../testUtils';

describe('Converter Tests', () => {
  test('CWC to Legacy', () => {
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
          currentLanguage: 'en',
        }
      )
    );

    expect(
      Converter.cwcToLegacy(
        {
          type: 'MESSAGE',
          id: '80299c76-b08f-4700-b660-df8691969042',
          lang: 'en',
          text: 'Hello',
          user: {
            id: 1234567,
            name: 'Jackie Chan',
            pubnubToken: 'dabc0a3a-5251-4dc9-b877-78e789b4516e',
            role: {
              label: 'HOST',
            },
          },
        },
        'public'
      )
    ).toEqual(
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
        timestamp: '2018-06-19 16:11:36 +0000',
        fromAvatar: null,
        isHost: true,
        label: 'HOST',
        isVolunteer: true,
        isUser: true,
        userId: 1234567,
        organizationId: 2,
        organizationName: 'Life.Church',
        roomType: 'public',
        channelToken: '6eaeb8f5f1f83018b5979f6254531ea9a46a48c20d3b117f857ba5c5ef10e9c7',
        eventStartTime: 1529425800000,
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
      Converter.legacyToCwc(
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
          timestamp: '2018-06-19 16:11:36 +0000',
          fromAvatar: null,
          isHost: true,
          label: 'HOST',
          isVolunteer: true,
          isUser: true,
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
        lang: 'en',
        text: 'Hello',
        user: {
          id: 1234567,
          name: 'Jackie Chan',
          pubnubToken: 'dabc0a3a-5251-4dc9-b877-78e789b4516e',
          role: {
            label: 'HOST',
          },
        },
      },
    );
  });
});