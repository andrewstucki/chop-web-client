// @flow
import React from 'react';
import bugsnag from '@bugsnag/js';
import bugsnagReact from '@bugsnag/plugin-react';

declare var ENV:string;

let client;
let ErrorBoundary;
if (ENV === 'development') {
  client = {
    // eslint-disable-next-line no-console
    notify: (error: Error | string, _meta: Object) => console.log(error),
  };
  // eslint-disable-next-line react/display-name
  ErrorBoundary = ({children}: {children: any}) => <>{children}</>;
  ErrorBoundary.displayName = 'ErrorBoundary';
} else {
  client = bugsnag({
    apiKey: '2403ac729529750d296e1e4ee022f7dc',
    releaseStage: ENV,
    notifyReleaseStages: [ 'production', 'staging' ],
  });

  client.use(bugsnagReact, React);

  ErrorBoundary = client.getPlugin('react');
}

export default client;

export {
  ErrorBoundary,
};
