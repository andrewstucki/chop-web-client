// @flow
import type { FeedType, OrganizationType } from '../feed/dux';
import { createMiddleware } from 'redux-beacon';
import GoogleTagManager from '@redux-beacon/google-tag-manager';
import TagManager from 'react-gtm-module';

// Type Definitions
type ActionType = {
  type: string
}

type EventDefinitionType = {
  hitType: string,
  event: string,
  payload: Object,
  organization: OrganizationType
}

type StateType = {
  feed: FeedType,
  io: any
}

// Event Definitions
const dataLayerEventDefinition = (action:ActionType, state:StateType) => ({
  hitType: 'event',
  event: action.type,
  payload: action,
  organization: state.feed.organization,
}:EventDefinitionType);

const initEventDefinition = () => {
  declare var GTM;
  TagManager.initialize(GTM);
};

// Map Event Definitions to Redux actions
const eventsMap = {
  INIT: initEventDefinition,
  '*': dataLayerEventDefinition,
};

const tagManagerMiddleware = createMiddleware(eventsMap, GoogleTagManager());

export default tagManagerMiddleware;

export {
  dataLayerEventDefinition,
  initEventDefinition,
};