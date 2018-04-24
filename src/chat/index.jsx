import React from 'react';
import Button from '../components/button';
import TextField from '../components/text-field';

const Chat = ({buttonOnClick, buttonText, textOnInput, textValue }) => (
  <div>
    <TextField onInput={textOnInput} value={textValue} />
    <Button onClick={buttonOnClick} text={buttonText} />
  </div>
);

export default Chat;