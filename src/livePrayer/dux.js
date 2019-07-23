export const REQUEST_LIVE_PRAYER = 'REQUEST_LIVE_PRAYER';

export type RequestLivePrayerType = {
  type: typeof REQUEST_LIVE_PRAYER,
  requesterPubnubToken: string,
  requesterNickname: string,
};

export const requestLivePrayer = (requesterPubnubToken: string, requesterNickname: string): RequestLivePrayerType => (
  {
    type: REQUEST_LIVE_PRAYER,
    requesterPubnubToken,
    requesterNickname,
  }
);