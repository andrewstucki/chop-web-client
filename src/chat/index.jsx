import React from 'react';
import Button from '../components/button';
import TextField from '../components/text-field';

const Chat = ({buttonOnClick, textOnInput, textValue }) => (
  <div>
    <TextField onInput={textOnInput} value={textValue} />
    <Button onClick={buttonOnClick} text="Send" />
  </div>
);

export default Chat;