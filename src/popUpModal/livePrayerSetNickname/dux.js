// Action Types

export const LIVE_PRAYER_SET_NICKNAME = 'LIVE_PRAYER_SET_NICKNAME';

// Flow Type Definitions

export type LivePrayerSetNicknameType = {
  type: LIVE_PRAYER_SET_NICKNAME,
}

// Action Creators

export const livePrayerSetNicknameType = (): LivePrayerSetNicknameType => (
  {
    type: LIVE_PRAYER_SET_NICKNAME,
  }
);
