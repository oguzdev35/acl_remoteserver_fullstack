// feature name
export const RULE = '[Rule]';

// action types
export const GET_RULE = `${RULE} GET`;
export const LIST_RULE = `${RULE} LIST`;
export const CREATE_RULE = `${RULE} CREATE`;
export const UPDATE_RULE = `${RULE} UPDATE`;
export const DELETE_RULE = `${RULE} DELETE`;

export const SET_RULE = `${RULE} SET`;
export const LOAD_RULE = `${RULE} LOAD`;
export const REMOVE_RULE = `${RULE} REMOVE`;

// action creators
export const getRule = (payload) => ({
    type: GET_RULE,
    payload: payload,
    docAction: SET_RULE
});

export const listRule = (payload) => ({
    type: LIST_RULE,
    payload: payload,
    docAction: LOAD_RULE
});

export const  createRule= (payload) => ({
    type: CREATE_RULE,
    payload: payload,
    docAction: SET_RULE
});

export const  updateRule = (payload) => ({
    type: UPDATE_RULE,
    payload: payload,
    docAction: SET_RULE
});

export const  deleteRule = (payload) => ({
    type: DELETE_RULE,
    payload: payload,
    docAction: REMOVE_RULE
});

//////////

export const setRules = ({rules, normalizeKey}) => ({
    type: LOAD_RULE,
    payload: rules,
    meta: {normalizeKey, feature: RULE}
});

export const setRule = ({rule, normalizeKey}) => ({
    type: SET_RULE,
    payload: rule,
    meta: {normalizeKey, feature: RULE}
});

export const removeRule = ({rule, normalizeKey}) => ({
    type: REMOVE_RULE,
    payload: rule,
    meta: {normalizeKey, feature: RULE}
});