// @flow
import { createSelector } from 'reselect';
import type {ClientInfoType, FeedType} from '../feed/dux';

const clientInfo = state => state.clientInfo;

const getClientInfo = createSelector<FeedType, void, ClientInfoType, ClientInfoType>(
  clientInfo,
  info => info
);

export {
  getClientInfo,
};
