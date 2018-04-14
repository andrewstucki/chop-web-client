type stateType = { name: string }
type actionType = { type: string }
const defaultState: stateType = { name: 'World'}

const reducer = (state: stateType = defaultState, action?: actionType): stateType => {
  if (!action || !action.type) {
    return state;
  }
  switch(action.type) {
    default:
      return state;
  }
}

export { reducer, stateType };
