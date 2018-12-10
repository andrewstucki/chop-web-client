import { createSelector } from 'reselect';

const clientInfo = state => state.clientInfo;

const getClientInfo = createSelector(
  clientInfo,
  info => info
);

export {
  getClientInfo,
};
