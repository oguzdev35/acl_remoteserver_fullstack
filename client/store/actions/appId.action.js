// feature name
export const APPID = '[APPID]';

export const SET_APPID = `${APPID} SET`;
export const UNSET_APPID = `${APPID} UNSET`;

export const setAppId = ({appId, normalizeKey}) => ({
  type: SET_APPID,
  payload: appId,
  meta: {normalizeKey, feature: APPID}
});

export const unsetAppId = () => ({
  type: UNSET_APPID,
  payload: null,
  meta: {normalizeKey, feature: APPID}
});
