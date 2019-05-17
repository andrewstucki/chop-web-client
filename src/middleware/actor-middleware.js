// @flow
type ActionType = {
  type: string,
}
type TakeActionType = (action: ActionType) => any;
type StoreType = {
  dispatch: TakeActionType,
  getState: () => any,
}

const actorMiddleware = (...actorClasses: Array<any>) => ({ dispatch, getState }: StoreType) => (next: TakeActionType) => {
  const actors = actorClasses.filter(actor => actor !== undefined).map(actor => new actor(dispatch, () => getState().feed));
  return (action: ActionType) => {
    const result = next(action);
    actors.forEach(actor => actor.dispatch(action));
    return result;
  };
};

export default actorMiddleware;
