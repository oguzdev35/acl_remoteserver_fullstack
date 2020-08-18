// feature name
export const DOOR = '[Door]';

// action types
export const GET_DOOR = `${DOOR} GET`;
export const LIST_DOOR = `${DOOR} LIST`;
export const CREATE_DOOR = `${DOOR} CREATE`;
export const UPDATE_DOOR = `${DOOR} UPDATE`;
export const DELETE_DOOR = `${DOOR} DELETE`;

export const SET_DOOR = `${DOOR} SET`;
export const LOAD_DOOR = `${DOOR} LOAD`;
export const REMOVE_DOOR = `${DOOR} REMOVE`;

// action creators
export const getDoor = (payload) => ({
    type: GET_DOOR,
    payload: payload,
    docAction: SET_DOOR
});

export const listDoor = (payload) => ({
    type: LIST_DOOR,
    payload: payload,
    docAction: LOAD_DOOR
});

export const  createDoor= (payload) => ({
    type: CREATE_DOOR,
    payload: payload,
    docAction: SET_DOOR
});

export const  updateDoor = (payload) => ({
    type: UPDATE_DOOR,
    payload: payload,
    docAction: SET_DOOR
});

export const  deleteDoor = (payload) => ({
    type: DELETE_DOOR,
    payload: payload,
    docAction: REMOVE_DOOR
});

//////////

export const setDoors = ({doors, normalizeKey}) => ({
    type: LOAD_DOOR,
    payload: doors,
    meta: {normalizeKey, feature: DOOR}
});

export const setDoor = ({door, normalizeKey}) => ({
    type: SET_DOOR,
    payload: door,
    meta: {normalizeKey, feature: DOOR}
});

export const removeDoor = ({door, normalizeKey}) => ({
    type: REMOVE_DOOR,
    payload: door,
    meta: {normalizeKey, feature: DOOR}
});