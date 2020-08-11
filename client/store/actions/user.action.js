// feature name
export const USER = '[User]';

// action types
export const LOGIN_USER_BY_EMAIL = `${USER} LOGIN EMAIL`;
export const LOGIN_USER_BY_USERNAME = `${USER} LOGIN USERNAME`;
export const LOGOUT_USER = `${USER} LOGOUT`;
export const SET_USER = `${USER} SET`;
export const UNSET_USER = `${USER} UNSET`;

// action creators
export const loginUserByEmail = (payload) => ({
    type: LOGIN_USER_BY_EMAIL,
    payload: payload,
    docAction: SET_USER
});

export const loginUserByUsername = (payload) => ({
    type: LOGIN_USER_BY_USERNAME,
    payload: payload,
    docAction: SET_USER
});

export const logoutUser = () => ({
    type: LOGOUT_USER,
    docAction: UNSET_USER
});

export const setUser = ({user, normalizeKey}) => ({
    type: SET_USER,
    payload: user,
    meta: {normalizeKey, feature: USER}
});

export const unsetUser = ({user, normalizeKey}) => ({
    type: UNSET_USER,
    payload: user,
    meta: {normalizeKey, feature: USER}
});