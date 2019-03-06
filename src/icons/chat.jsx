import React from 'react';

const Chat = ({color, large = true}) => {
  if (large) {
    return (
      <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M46 22H18V42H35V47L40 42H46V22Z" fill={color}/>
      </svg>
    );
  } else {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M18 4H2V16H12V19L15 16H18V4Z" fill={color}/>
      </svg>
    );
  }
};

export default Chat;