const sequence = {
  INIT: 'GET_APP_DATA',
  GET_APP_DATA_SUCCESS: 'CHAT_CONNECT',
};

class SequenceActor {
  constructor (dispatch, getState) {
    this.storeDispatch = dispatch;
    this.getState = getState;
  }

  dispatch (action: any) {
    if (sequence[action.type]) {
      this.storeDispatch(
        {
          type: sequence[action.type],
        }
      );
    }
  }
}

export default SequenceActor;