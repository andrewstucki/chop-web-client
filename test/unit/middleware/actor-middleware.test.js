// @flow
import actorMiddleware from '../../../src/middleware/actor-middleware';

describe('Actor Middleware', () => {
  test('actors init and receive actions', () => {
    expect.assertions(6);
    class Actor {
      constructor (_dispatch) {
        expect(_dispatch).toBe(dispatch);
      }
      dispatch (_action) {
        expect(_action).toBe(action);
      }
    }
    const dispatch = jest.fn();
    const next = jest.fn();
    const action = {
      type: 'NOOP',
    };
    const middleware = actorMiddleware(Actor, Actor)({ dispatch: dispatch })(next);
    middleware(action);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenLastCalledWith(action);
  });
});