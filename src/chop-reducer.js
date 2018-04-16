// @flow
type State = {
  name: string
}
type Action = {
  type: string
}
const defaultState: State = { name: 'World'}

const chopReducer = (state: State = defaultState, action?: Action): State => {
  if (!action || !action.type) {
    return state;
  }
  switch(action.type) {
    default:
      return state;
  }
}

export default chopReducer;
