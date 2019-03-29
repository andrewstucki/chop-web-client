// @flow strict

import type {UIDType} from '../cwc-types';


type SharedUserType = {
  id: UIDType | null,
  name: string,
  avatarUrl?: string | null,
  pubnubToken: string,
  role: {
    label: string,
  },
};

export type {
  SharedUserType,
};