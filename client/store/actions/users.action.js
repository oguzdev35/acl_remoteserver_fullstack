// feature name
export const USERS = '[USERS]';

// action types
export const GET_USER = `${USERS} GET`;
export const LIST_USER = `${USERS} LIST`;
export const CREATE_USER = `${USERS} CREATE`;
export const UPDATE_USER = `${USERS} UPDATE`;
export const DELETE_USER = `${USERS} DELETE`;
export const ASSIGN_USER = `${USERS} ASSIGN`;

export const SET_USER = `${USERS} SET`;
export const LOAD_USER = `${USERS} LOAD`;
export const REMOVE_USER = `${USERS} REMOVE`;

// action creators
export const getUser = (payload) => ({
    type: GET_USER,
    payload: payload,
    docAction: SET_USER
});

export const listUser = () => ({
    type: LIST_USER,
    payload: undefined,
    docAction: LOAD_USER
});

export const  createUser = (payload) => ({
    type: CREATE_USER,
    payload: payload,
    docAction: SET_USER
});

export const  updateUser = (payload) => ({
    type: UPDATE_USER,
    payload: payload,
    docAction: SET_USER
});

export const  deleteUser = (payload) => ({
    type: DELETE_USER,
    payload: payload,
    docAction: REMOVE_USER
});

export const assignUser = (payload) => ({
    type: ASSIGN_USER,
    payload: payload,
    docAction: SET_USER
});

//////////

export const setUsers = ({users, normalizeKey}) => ({
    type: LOAD_USER,
    payload: users,
    meta: {normalizeKey, feature: USERS}
});

export const setUser = ({user, normalizeKey}) => ({
    type: SET_USER,
    payload: user,
    meta: {normalizeKey, feature: USERS}
});

export const removeUser = ({user, normalizeKey}) => ({
    type: REMOVE_USER,
    payload: user,
    meta: {normalizeKey, feature: USERS}
});