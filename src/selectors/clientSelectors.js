// @flow
import { createSelector } from 'reselect';
import type {ClientInfoType} from '../feed/dux';
import type { ChopStateType } from '../chop/dux';

const ID = 'feed';

const local = state => state[ID] || state;

const clientInfo = state => local(state).clientInfo;

const getClientInfo = createSelector<ChopStateType, void, ClientInfoType, ClientInfoType>(
  clientInfo,
  info => info
);

export {
  getClientInfo,
};
