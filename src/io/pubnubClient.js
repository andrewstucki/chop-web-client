// @flow
import Pubnub from 'pubnub';
import type { PubnubPublishMessageType } from './chat';

type PubnubClientConfig = {
  publishKey:string,
  subscribeKey:string,
  authKey:string,
  uuid:string,
};

let _instance:Pubnub = null;
const PubnubClient = {
  config: (config: PubnubClientConfig) => _instance = new Pubnub(config),
  publish: (message:PubnubPublishMessageType) => {
    if (!_instance) {
      throw new Error('Pubnub Client has not been initialized, please call PubnubClient.config() first.');
    }
    _instance.publish(message);
  },
};

Object.freeze(PubnubClient);
export default PubnubClient;
