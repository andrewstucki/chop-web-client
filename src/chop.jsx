// @flow
import * as React from 'react';
import Button from './components/button'

const Chop = ()  => (
  <div>
    <Button click={function() { console.log("Hi")}} text="Hello World!" />
  </div>
);

export default Chop;