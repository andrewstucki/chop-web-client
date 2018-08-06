// @flow
type ActionType = {
  type: string,
}
type TakeActionType = (action: ActionType) => void;
type StoreType = {
  dispatch: TakeActionType,
}

const actorMiddleware = (...actorClasses: Array<any>) => ({ dispatch }: StoreType) => (next: TakeActionType) => {
  const actors = actorClasses.map(actor => new actor(dispatch));
  return (action: ActionType) => {
    next(action);
    actors.forEach(actor => actor.dispatch(action));
  };
};

export default actorMiddleware;