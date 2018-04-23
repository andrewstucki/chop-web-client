# Chat Breakdown

The Chat allows users to create messages and send them. It does not display the
messages, that is done in the feed. The current channel is updated but a
current channel control.

## State
```
  message: {
    id: string, // unique ID
    user: string, // user ID who sent message
    message: string
  }
  chat: {
    currentInput: string,
    currentChannel: string // unique channel ID
    channels: {
      id: string, // unique channel ID
      messages: [ message ]
    }
  }
```

## Actions
Sends
- UPDATE_INPUT
- ADD_MESSAGE_TO_CHANNEL
Listens to
- CHANGE_CHANNEL

## Components
- TextField
- Button

## Selectors
- charaterCount: int
  returns the charater count of the currentInput 

## Commands
- inputTyped(value: string)
  count charaters, limit length, remove formating, highlight @ mentions
- sendMessage
  create message, add to channel, send to PubNub 

## IO
- PubNub