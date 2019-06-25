// @flow
import { currentEvent } from '../../../src/io/sagas/currentEvent';
import { runSaga } from 'redux-saga';
import queries from '../../../src/io/queries';
import {
  setLanguageOptions,
  setOrganization,
  setPubnubKeys,
  setChannels,
} from '../../../src/feed/dux';
import { setEvent } from '../../../src/event/dux';
import { setSubscriber } from '../../../src/subscriber/dux';
import {
  setSchedule,
} from '../../../src/schedule/dux';
import {avatarImageExists} from '../../../src/util';
import { mockDate } from '../../testUtils';
import {setVideo} from '../../../src/videoFeed/dux';
import { startTimer as _startTimer } from '../../../src/io/sagas/sequence';
import { PRIMARY_PANE } from '../../../src/pane/dux';
import { setPaneToEvent } from '../../../src/pane/content/event/dux';

jest.mock('../../../src/io/sagas/sequence');
jest.mock('../../../src/io/queries');
jest.mock('../../../src/util');
const mock = (mockFn: any) => mockFn;

describe('Current Event', () => {
  const mockCurrentState = mock(queries.currentState);
  const mockAvatarImageExists = mock(avatarImageExists);
  test('Loads successfully', async () => {
    mockDate(1553807000000);
    const dispatched = [];
    mockCurrentState.mockResolvedValue(
      {
        pubnubKeys: {
          publishKey: 'xyz',
          subscribeKey: 'abc',
        },
        currentSubscriber: {
          userId: 1234,
          id: '1234',
          nickname: 'John Jonson',
          firstName: 'John',
          lastName: 'Jonson',
          email: 'john@jonson.com',
          phoneNumber: '867-5309',
          avatar: 'http://image.avatar.gif',
          pubnubAccessKey: '0987',
          role: {
            label: '',
            permissions: [],
          },
          preferences: {
            textMode: 'COMPACT',
          },
        },
        currentOrganization: {
          id: 0,
          name: 'First Church of the World',
          logoUrl: 'https://chop.com/image/url',
          theme: {
            headerBackgroundColor: 'red',
            headerMenuIconColor: 'white',
          },
        },
        currentLanguages: [
          { name: 'English', code: 'en' },
          { name: 'Spanish', code: 'es' },
        ],
        currentEvent: {
          title: 'John on John',
          id: '888',
          eventTime: { id: '123' },
          startTime: 456,
          endTime: 789,
          videoStartTime: 100,
          speaker: 'John',
          description: 'John talks about the book of John.',
          hostInfo: 'Yo!',
          sequence: {
            serverTime: 12345,
            steps: [
              {
                fetchTime: 1553806394,
                queries: [
                  'feeds',
                  'event',
                ],
                transitionTime: 1553806500,
              },
              {
                fetchTime: 1553807821,
                queries: [
                  'feeds',
                  'event',
                  'video',
                ],
                transitionTime: 1553807500,
              },
            ],
          },
          feed: [
            {
              id: '111',
              name: 'Public',
              direct: false,
              type: 'public',
              subscribers: [],
            },
            {
              id: '222',
              name: 'Direct',
              direct: true,
              type: 'direct',
              subscribers: [
                {
                  id: '123',
                  avatar: '',
                  nickname: 'Joe',
                },
              ],
            },
          ],
          video: {
            url: 'https://www.youtube.com/watch?v=TD2XGwmRJi8',
            type: 'simulated',
          },
          enabledFeatures: {
            chat: true,
          },
          eventNotes: '<p>Some event notes for <b>YOU</b></p>',
        },
        schedule: [
          {
            endTime: 1553817500,
            id: '129073',
            scheduleTime: 1542290400,
            startTime: 1553817500,
            fetchTime: 1542289490,
            title: 'Mastermind',
            hostInfo: '',
          },
          {
            endTime: 1542463200,
            id: '129073',
            scheduleTime: 1542376800,
            startTime: 1553827500,
            fetchTime: 1542375890,
            title: 'Mastermind',
            hostInfo: '',
          },
        ],
      }
    );
    mockAvatarImageExists.mockResolvedValue(true);

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => (
        {
          sequence: {
            startTime: 0,
            steps: [],
          },
          schedule: [],
          feed: {
            // because the state isn't updated as the test runs
            // we have to set some default values here
            channels: {
              '111': {
                name: 'Public',
              },
            },
            languageOptions: [],
          },
          event: {
            // because the event defined above doesn't get set
            // in the context of the test we have to set it here
            id: '888',
          },
        }
      ),
    },
    currentEvent).toPromise();

    expect(mockAvatarImageExists).toBeCalledWith('1234');
    expect(dispatched).toEqual([
      setPubnubKeys('xyz', 'abc'),
      setSubscriber({
        userId: 1234,
        id: '1234',
        nickname: 'John Jonson',
        firstName: 'John',
        lastName: 'Jonson',
        email: 'john@jonson.com',
        phoneNumber: '867-5309',
        avatar: 'http://image.avatar.gif',
        pubnubAccessKey: '0987',
        role: {
          label: '',
          permissions: [],
        },
        preferences: { textMode: 'COMPACT' },
      }),
      {
        type: 'SET_AVATAR',
        url: 'https://chop-v3-media.s3.amazonaws.com/users/avatars/1234/thumb/photo.jpg',
      },
      setOrganization(0, 'First Church of the World', 'https://chop.com/image/url', { headerBackgroundColor: 'red', headerMenuIconColor: 'white'}),
      setLanguageOptions([
        { name: 'English', code: 'en' },
        { name: 'Spanish', code: 'es' },
      ]),
      setEvent(
        'John on John',
        '888',
        '123',
        456,
        789,
        100,
        'John',
        'John talks about the book of John.',
        'Yo!',
        { chat: true },
        '<p>Some event notes for <b>YOU</b></p>'
      ),
      {
        type: 'SET_SEQUENCE',
        sequence: {
          serverTime: 12345,
          steps: [
            {
              fetchTime: 1553807821,
              queries: [
                'feeds',
                'event',
                'video',
              ],
              transitionTime: 1553807500,
            },
          ],
        },
      },
      setChannels(
        {
          '111': {
            id: '111',
            name: 'Public',
            direct: false,
            placeholder: false,
            type: 'public',
            subscribers: [],
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1553807000000,
          },
          '222': {
            id: '222',
            name: 'Direct',
            direct: true,
            placeholder: false,
            type: 'direct',
            subscribers: [
              {
                id: '123',
                avatar: '',
                nickname: 'Joe',
                role: { label: '' },
              },
            ],
            moments: [],
            anchorMoments: [],
            scrollPosition: 0,
            sawLastMomentAt: 1553807000000,
          },
        }
      ),
      setPaneToEvent(PRIMARY_PANE, '111'),
      setVideo(
        'https://www.youtube.com/watch?v=TD2XGwmRJi8',
        'simulated'
      ),
      setSchedule([
        {
          endTime: 1553817500,
          fetchTime: 1542289490,
          id: '129073',
          scheduleTime: 1542290400,
          startTime: 1553817500,
          title: 'Mastermind',
          hostInfo: '',
        },
        {
          endTime: 1542463200,
          fetchTime: 1542375890,
          id: '129073',
          scheduleTime: 1542376800,
          startTime: 1553827500,
          title: 'Mastermind',
          hostInfo: '',
        },
      ]),
      setPaneToEvent(PRIMARY_PANE, '111'),
    ]);
  });
});
