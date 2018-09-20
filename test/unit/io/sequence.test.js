import SequenceActor from '../../../src/io/sequence';

describe('Sequence Actor Test', () => {
  test('INIT sequence', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const seq = new SequenceActor(dispatch, getState);

    seq.dispatch(
      {
        type: 'INIT',
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      {
        type: 'GET_ACCESS_TOKEN',
      }
    );
  });

  test('GET_APP_DATA_SUCCESS sequence', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const seq = new SequenceActor(dispatch, getState);

    seq.dispatch(
      {
        type: 'SET_INIT_DATA',
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(
      {
        type: 'CHAT_CONNECT',
      }
    );
  });

  test('PUBLISH_MOMENT sequence', () => {
    const dispatch = jest.fn();
    const getState = jest.fn();
    const seq = new SequenceActor(dispatch, getState);

    seq.dispatch(
      {
        type: 'PUBLISH_MOMENT',
      }
    );

    expect(dispatch).toHaveBeenCalledTimes(0);
  });
});