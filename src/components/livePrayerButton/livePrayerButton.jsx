// @flow
import * as React from 'react';
import { Button, Icon, Text } from './styles';
import ChatIcon from '../../../assets/chat-notification.svg';
import type { SharedSubscriberType } from '../../subscriber/dux';

type LivePrayerButtonPropsType = {
  currentSubscriber: SharedSubscriberType,
  setNickname: () => void,
  requestLivePrayer: (requesterPubnubToken:string, requesterNickname:string) => void,
};

const LivePrayerButton = ({
  currentSubscriber,
  setNickname,
  requestLivePrayer,
}:LivePrayerButtonPropsType) => {
  const handleRequest = () => {
    if (currentSubscriber.nickname !== '' && currentSubscriber.nickname !== null) {
      requestLivePrayer(currentSubscriber.id, currentSubscriber.nickname);
    } else {
      setNickname();
    }
  };

  return (
    <Button onClick={handleRequest} data-testid='livePrayer-button'>
      <Icon dangerouslySetInnerHTML={{ __html: ChatIcon }}/>
      <Text>Live Prayer</Text>
    </Button>
  );
};

export default LivePrayerButton;