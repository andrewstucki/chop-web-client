// @flow
import Converter from '../../../src/io/converter';
import { mockDate } from '../../testUtils';

describe('Converter Tests', () => {
  test('CWC to Legacy', () => {
    mockDate('2018-06-19 16:11:36 GMT-0000');

    Converter.config(
      {
        event: {
          id: '320418',
          startTime: 1529425800000,
          title: 'When Pigs Fly - Week 2',
        },
        organization: {},
      }
    );

    expect(
      Converter.cwcToLegacy(
        {
          type: 'MESSAGE',
          id: '80299c76-b08f-4700-b660-df8691969042',
          lang: 'en',
          text: 'Hello',
          user: {
            name: 'Jackie Chan',
            pubnubToken: 'dabc0a3a-5251-4dc9-b877-78e789b4516e',
            role: {
              label: 'HOST',
            },
          },
        }
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
        eventStartTime: 1529425800000,
      }
    );
  });
});