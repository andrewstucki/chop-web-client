// @flow
import actorMiddleware from '../../../src/middleware/actor-middleware';

describe('Actor Middleware', () => {
  test('actors init and receive actions', () => {
    expect.assertions(7);
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
    next.mockReturnValue(42);
    const action = {
      type: 'NOOP',
    };
    const middleware = actorMiddleware(Actor, Actor)({ dispatch: dispatch })(next);
    expect(middleware(action)).toBe(42);
    expect(next).toHaveBeenCalledTimes(1);
    expect(next).toHaveBeenLastCalledWith(action);
  });
});