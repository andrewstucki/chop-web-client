import * as React from 'react';

// Shim memo until it is added to Enzyme: https://github.com/airbnb/enzyme/issues/1875
const memo = (Component: React.ReactType) =>

  class extends React.PureComponent { // eslint-disable-line react/display-name
    render () {
      return <Component {...this.props} />;
    }
  };

module.exports = { ...React, memo };
