import { getCurrentSubscriberAsSharedSubscriber } from '../../../src/subscriber/dux';
import { defaultState } from '../../../src/chop/dux';

describe('getCurrentSubscriberAsSharedSubscriber', () => {
  test('It removes the permissions and pubnubAccessKey', () => {
    const state = {
      ...defaultState,
      subscriber: {
        ...defaultState.subscriber,
        currentSubscriber: {
          id: 12345,
          pubnubAccessKey: '67890',
          avatar: null,
          nickname: 'Joan Jet',
          role: {
            label: '',
            permissions: ['global.admin'],
          },
          preferences: {
            textMode: 'COMPACT',
          },
        },
      },
    };

    expect(getCurrentSubscriberAsSharedSubscriber(state)).toEqual({
      id: 12345,
      avatar: null,
      nickname: 'Joan Jet',
      role: {
        label: '',
      },
    });
  });
});
