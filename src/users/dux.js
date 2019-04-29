// @flow strict


type SharedUserType = {
  id: number,
  name: string,
  avatar: ?string,
  pubnubToken: string,
  role: {
    label: string,
  },
};

export type {
  SharedUserType,
};