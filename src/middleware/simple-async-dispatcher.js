import { Pubnub } from 'pubnub';

// KENNY I REMOVED GETSTATE BECAUSE THE LINTER WAS MAD
const actorMiddleware = (...actorClasses) => ({ dispatch }) => next => {
  const actors = actorClasses.map(actor => new actor(dispatch));
  return action => {
    next(action);
    actors.forEach(actor => actor.dispatch(action));
  };
};


// {
//   "messageText": message.text
//   "language": message.lang
//   "eventTimeId": event.id
//   "eventTimeOffset": Date.now() - event.startTime
//   "eventTitle": event.title
//   "uniqueMessageToken": message.id
//   "fromNickname": user.name
//   "fromToken": user.pubnubToken
//   "msgId": message.id
//   "timestamp": Date.now() formated
//   "fromAvatar": user.avatar
//   "isHost": hard code to true for now
//   "label": user.role.label
//   "isVolunteer": hard code to true for now
//   "isUser": true
//   "userId": user.id
//   "organizationId": organization.id
//   "organizationName": organization.name
//   "roomType": "public", "direct", "prayer", "volunteer"
//   "channelToken": channel.id
//   "eventStartTime": event.startTime
// }

class InitSequenceActor {
  constructor (dispatch) {
    this.dispatch = dispatch;
    this.serverData;
  }

  dispatch (action) {
    switch (action.type) {
    case 'INIT':
      this.dispatch(
        {
          type: 'APP_DATA_REQUEST',
        }
      );
      break;
    case 'APP_DATA_RECEIVED':
      this.serverData = action.data;
      Translator.config(action);
      this.dispatch(
        {
          type: 'CHAT_CONNECT',
        }
      );
      break;
    case 'CHAT_CONNECTION_SUCCESS':
      this.dispatch(
        {
          type: 'SET_APP_STATE',
          data: this.data,
        }
      );
      break;
    }
  }
}

let configuration = {};
const Translator = {
  config: action =>
    configuration = {
      eventTimeId: action.event.id,
      eventTitle: action.event.title,
      organizationId: action.organization.id,
      organizationName: action.organization.name,
      eventStartTime: action.event.startTime,
    },

  fromLegacy: () => configuration,

  fromCwc: () => configuration,
};

class ChatActor {
  constructor (dispatch) {
    this.dispatch = dispatch;
    this.pubnub;
    this.translator;
  }

  statusListener (statusEvent) {
    switch (statusEvent.category) {
    case 'PNNetworkDownCategory':
    case 'PNNetworkIssuesCategory':
    case 'PNAccessDeniedCategory':
    case 'PNMalformedResponseCategory':
    case 'PNBadRequestCategory':
    case 'PNDecryptionErrorCategory':
    case 'PNTimeoutCategory':
      this.dispatch(
        {
          type: 'CHART_CONNECTION_ERROR',
          event: statusEvent,
        }
      );
      break;
    case 'PNConnectedCategory':
    case 'PNReconnectedCategory':
      this.dispatch(
        {
          type: 'CHAT_CONNECTION_SUCCESS',
          event: statusEvent,
        }
      );
      break;
    }
  }

  messageListener (legacyMessage) {
    const action = Translator.fromLegacy(legacyMessage);
    this.dispatch(action);
  }

  // presenceListener (presenceEvent) {

  // }

  publishMoment (action) {
    this.pubnub.publish(
      {
        message: action.message,
        channel: action.channel,
      }
    );
  }

  chatConnect (action) {
    this.translator = new Translator(action);
    this.pubnub = new Pubnub(
      {
        publishKey: action.keys.publish,
        subscribeKey: action.keys.subscribe,
        uuid: action.user.pubnubToken,
        authKey:  action.user.pubnubAccessKey,
      }
    );
    this.pubnub.addListener(
      {
        status: this.statusListener,
        message: this.messageListener,
        // presence: this.presenceListener,
      }
    );
    this.pubnub.subscribe(
      action.channels.map(channel => channel.id)
    );
  }

  // publishPrayerRequest (action) {
    
  // }

  dispatch (action) {
    const legacyAction = Translator.fromCwc(action);
    switch (legacyAction.type) {
    case 'PUBLISH_MOMENT':
      this.publishMoment(legacyAction);
      break;
    case 'CHAT_CONNECT':
      this.chatConnect(legacyAction);
      break;
    // case 'PUBLISH_PRAYER_REQUEST':
    //   this.publishPrayerRequest(action);
    //   break;
    }
  }
}

class MiniChatActor {
  constructor (dispatch) {
    this.dispatch = dispatch;
    this.pubnub = {};
  }

  publishMoment (action) {
    this.pubnub.emit('message', action);
    this.pubnub.on('message', payload => {
      this.dispatch(
        {
          type: 'RECEIVE_MOMENT',
          message: payload.data,
        }
      );
    });
  }

  dispatch (action) {
    switch (action.type) {
    case 'PUBLISH_MOMENT' :
      this.publishMoment(action);
    }
  }
}

export { MiniChatActor };
export default actorMiddleware(ChatActor, InitSequenceActor);
