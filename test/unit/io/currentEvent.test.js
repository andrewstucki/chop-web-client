// @flow
import { currentEvent } from '../../../src/io/sagas/currentEvent';
import { runSaga } from 'redux-saga';
import queries from '../../../src/io/queries';
import {setEvent, setLanguageOptions, setOrganization, setPubnubKeys, setUser} from '../../../src/feed/dux';
import {avatarImageExists} from '../../../src/util';
import { mockDate } from '../../testUtils';

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
        currentUser: {
          id: '1234',
          nickname: 'John Jonson',
          avatar: 'http://image.avatar.gif',
          pubnubAccessKey: '0987',
          pubnubToken: '6543',
          role: {
            label: '',
            permissions: [],
          },
        },
        organization: {
          id: 0,
          name: 'First Church of the World',
        },
        currentLanguages: [
          { name: 'English', code: 'en' },
          { name: 'Spanish', code: 'es' },
        ],
        currentEvent: {
          title: 'John on John',
          id: 888,
          eventTime: { id: 123 },
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
        },
      }
    );
    mockAvatarImageExists.mockResolvedValue(true);

    await runSaga({
      dispatch: action => dispatched.push(action),
      getState: () => ({languageOptions: []}),
    },
    currentEvent).toPromise();

    expect(mockAvatarImageExists).toBeCalledWith('1234');
    expect(dispatched).toEqual([
      setPubnubKeys('xyz', 'abc'),
      setUser({
        id: '1234',
        name: 'John Jonson',
        avatar: 'http://image.avatar.gif',
        pubnubAccessKey: '0987',
        pubnubToken: '6543',
        role: {
          label: '',
          permissions: [],
        },
      }),
      {
        type: 'SET_AVATAR',
        url: 'https://chop-v3-media.s3.amazonaws.com/users/avatars/1234/thumb/photo.jpg',
      },
      setOrganization(0, 'First Church of the World'),
      setLanguageOptions([
        { name: 'English', code: 'en' },
        { name: 'Spanish', code: 'es' },
      ]),
      setEvent(
        'John on John',
        888,
        123,
        456,
        789,
        100,
        'John',
        'John talks about the book of John.',
        'Yo!',
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
    ]);
  });
});