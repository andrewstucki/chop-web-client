// @flow
import { useMemo } from 'react';
import type { PrivateUserType } from '../users/dux';
import { checkForPermissions } from '../users/dux';

/*
  Example Usage:

  function MuteUserButton (props) {
    const { currentUser } = props;
    const hasPermissions = usePermissions(currentUser, ['feed.user.mute']);

    if (hasPermissions) {
      ...render
    } else {
      return null;
    }
  }
 */

const usePermissions = (user:PrivateUserType, requiredPermissions:Array<string>, requireAll:boolean = false):boolean => (
  useMemo <boolean> (
    () => checkForPermissions(user, requiredPermissions, requireAll),
    [user, requiredPermissions, requireAll]
  )
);

export { usePermissions };
