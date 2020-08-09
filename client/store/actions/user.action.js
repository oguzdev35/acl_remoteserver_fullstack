// feature name
export const USER = '[User]';

// action types
export const LOGIN_USER_BY_EMAIL = `${USER} LOGIN EMAIL`;
export const LOGIN_USER_BY_USERNAME = `${USER} LOGIN USERNAME`;
export const SET_USER = `${USER} SET`;

// action creators
export const loginUserByEmail = (payload) => ({
    type: LOGIN_USER_BY_EMAIL,
    payload: payload
});

export const loginUserByUsername = (payload) => ({
    type: LOGIN_USER_BY_USERNAME,
    payload: payload
});

export const setUser = ({user, normalizeKey}) => ({
    type: SET_USER,
    payload: user,
    meta: {normalizeKey, feature: USER}
});