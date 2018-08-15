// @flow
import { GET_INIT_DATA } from '../feed/dux';
const sequence = {
  INIT: GET_INIT_DATA,
  SET_INIT_DATA: 'CHAT_CONNECT',
};

type ActionType = {
  type: string,
}

type dispatch = (action: ActionType) => any;
type getState = () => any;

class SequenceActor {
  storeDispatch: dispatch
  getState: getState

  constructor (dispatch: dispatch, getState: getState) {
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