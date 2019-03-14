// @flow
import React from 'react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

declare var ENV:string;

const client = bugsnag({
  apiKey: '2403ac729529750d296e1e4ee022f7dc',
  releaseStage: ENV,
  notifyReleaseStages: [ 'production', 'staging' ],
});

client.use(bugsnagReact, React);

const ErrorBoundary = client.getPlugin('react');

export default client;

export {
  ErrorBoundary,
};