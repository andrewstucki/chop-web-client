// @flow
import { useMemo } from 'react';
import type { PrivateUserType } from '../users/dux';

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
    () => {
      if (requireAll) {
        return requiredPermissions.every(
          permission => user.role.permissions.includes(permission)
        );
      } else {
        return user.role.permissions.some(
          permission => requiredPermissions.includes(permission)
        );
      }
    },
    [user, requiredPermissions, requireAll]
  )
);

export { usePermissions };
