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

type TagManagerType = {
  gtmId: string,
  auth: string,
  preview: string
}

// Event Definitions
const dataLayerEventDefinition = (action:ActionType, state:StateType) => ({
  hitType: 'event',
  event: action.type,
  payload: action,
  organization: state.feed.organization,
}:EventDefinitionType);

const initEventDefinition = (action:ActionType, state:StateType) => { // eslint-disable-line no-unused-vars
  // TODO: These should come from an Environment Service. Currently they are hard coded to non-production.
  const tagManagerArgs:TagManagerType = {
    gtmId: 'GTM-MQMRR25',
    auth: 'I28B6zHKm1IufUQpkVRF_w',
    preview: 'env-5',
  };

  TagManager.initialize(tagManagerArgs);
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