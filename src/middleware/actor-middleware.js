// @flow
type ActionType = {
  type: string,
}
type TakeActionType = (action: ActionType) => any;
type StoreType = {
  dispatch: TakeActionType,
  getStore: () => any,
}

const actorMiddleware = (...actorClasses: Array<any>) => ({ dispatch, getStore }: StoreType) => (next: TakeActionType) => {
  const actors = actorClasses.map(actor => new actor(dispatch, getStore));
  return (action: ActionType) => {
    const result = next(action);
    actors.forEach(actor => actor.dispatch(action));
    return result;
  };
};

export default actorMiddleware;