// feature name
export const PERSON = '[Person]';

// action types
export const GET_PERSON = `${PERSON} GET`;
export const LIST_PERSON = `${PERSON} LIST`;
export const CREATE_PERSON = `${PERSON} CREATE`;
export const UPDATE_PERSON = `${PERSON} UPDATE`;
export const DELETE_PERSON = `${PERSON} DELETE`;
export const ASSIGN_PERSON = `${PERSON} ASSIGN`;
export const REVOKE_PERSON = `${PERSON} REVOKE`;

export const SET_PERSON = `${PERSON} SET`;
export const LOAD_PERSON = `${PERSON} LOAD`;
export const REMOVE_PERSON = `${PERSON} REMOVE`;
export const CLEAR_PERSON = `${PERSON} CLEAR`;

// action creators
export const assignPerson = (payload) => ({
    type: ASSIGN_PERSON,
    payload: payload,
    docAction: SET_PERSON
});

export const revokePerson = (payload) => ({
    type: REVOKE_PERSON,
    payload: payload,
    docAction: SET_PERSON
});

export const getPerson = (payload) => ({
    type: GET_PERSON,
    payload: payload,
    docAction: SET_PERSON
});

export const listPerson = (payload) => ({
    type: LIST_PERSON,
    payload: payload,
    docAction: LOAD_PERSON
});

export const  createPerson= (payload) => ({
    type: CREATE_PERSON,
    payload: payload,
    docAction: SET_PERSON
});

export const  updatePerson = (payload) => ({
    type: UPDATE_PERSON,
    payload: payload,
    docAction: SET_PERSON
});

export const  deletePerson = (payload) => ({
    type: DELETE_PERSON,
    payload: payload,
    docAction: REMOVE_PERSON
});


//////////

export const setPersons = ({persons, normalizeKey}) => ({
    type: LOAD_PERSON,
    payload: persons,
    meta: {normalizeKey, feature: PERSON}
});

export const setPerson = ({person, normalizeKey}) => ({
    type: SET_PERSON,
    payload: person,
    meta: {normalizeKey, feature: PERSON}
});

export const removePerson = ({person, normalizeKey}) => ({
    type: REMOVE_PERSON,
    payload: person,
    meta: {normalizeKey, feature: PERSON}
});

export const clearPerson = () => ({
    type: CLEAR_PERSON,
    meta: {feature: PERSON}
});