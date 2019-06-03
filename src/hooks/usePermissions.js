// @flow
import { useMemo } from 'react';
import type { PrivateSubscriberType } from '../subscriber/dux';
import { checkForPermissions } from '../subscriber/dux';

/*
  Example Usage:

  function MuteSubscriberButton (props) {
    const { currentSubscriber } = props;
    const hasPermissions = usePermissions(currentSubscriber, ['feed.subscriber.mute']);

    if (hasPermissions) {
      ...render
    } else {
      return null;
    }
  }
 */

const usePermissions = (subscriber:PrivateSubscriberType, requiredPermissions:Array<string>, requireAll:boolean = false):boolean => (
  useMemo <boolean> (
    () => checkForPermissions(subscriber, requiredPermissions, requireAll),
    [subscriber, requiredPermissions, requireAll]
  )
);

export { usePermissions };
