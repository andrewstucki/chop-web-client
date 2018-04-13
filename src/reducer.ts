type stateType = { name: string }
type actionType = { type: string }
const defaultState: stateType = { name: 'World'}

const reducer = (state: stateType = defaultState, action: actionType): stateType => {
  switch(action.type) {
    default:
      return state;
  }
}

export { reducer, stateType };
