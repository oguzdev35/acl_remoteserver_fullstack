// feature name
export const PLACE = '[Place]';

// action types$
export const GET_PLACE = `${PLACE} GET`;
export const LIST_PLACE = `${PLACE} LIST`;
export const CREATE_PLACE = `${PLACE} CREATE`;
export const UPDATE_PLACE = `${PLACE} UPDATE`;
export const DELETE_PLACE = `${PLACE} DELETE`;


export const SET_PLACE = `${PLACE} SET`;
export const LOAD_PLACE = `${PLACE} LOAD`;
export const REMOVE_PLACE = `${PLACE} REMOVE`;
export const CLEAR_PLACE = `${PLACE} CLEAR_PLACE`;

// action creators
export const getPlace = (payload) => ({
    type: GET_PLACE,
    payload: payload,
    docAction: SET_PLACE
});


export const listPlace = (payload) => ({
    type: LIST_PLACE,
    payload: payload,
    docAction: LOAD_PLACE
});

export const  createPlace= (payload) => ({
    type: CREATE_PLACE,
    payload: payload,
    docAction: SET_PLACE
});

export const  updatePlace = (payload) => ({
    type: UPDATE_PLACE,
    payload: payload,
    docAction: SET_PLACE
});

export const  deletePlace = (payload) => ({
    type: DELETE_PLACE,
    payload: payload,
    docAction: REMOVE_PLACE
});


//////////

export const setPlaces = ({places, normalizeKey}) => ({
    type: LOAD_PLACE,
    payload: places,
    meta: {normalizeKey, feature: PLACE}
});

export const setPlace = ({place, normalizeKey}) => ({
    type: SET_PLACE,
    payload: place,
    meta: {normalizeKey, feature: PLACE}
});

export const removePlace = ({place, normalizeKey}) => ({
    type: REMOVE_PLACE,
    payload: place,
    meta: {normalizeKey, feature: PLACE}
});

export const clearPlace = () => ({
    type: CLEAR_PLACE,
    meta: {feature: PLACE}
});