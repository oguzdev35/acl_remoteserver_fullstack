// feature name
export const DEPARTMENT = '[Department]';

// action types
export const GET_DEPARTMENT = `${DEPARTMENT} GET`;
export const LIST_DEPARTMENT = `${DEPARTMENT} LIST`;
export const CREATE_DEPARTMENT = `${DEPARTMENT} CREATE`;
export const UPDATE_DEPARTMENT = `${DEPARTMENT} UPDATE`;
export const DELETE_DEPARTMENT = `${DEPARTMENT} DELETE`;

export const SET_DEPARTMENT = `${DEPARTMENT} SET`;
export const LOAD_DEPARTMENT = `${DEPARTMENT} LOAD`;
export const REMOVE_DEPARTMENT = `${DEPARTMENT} REMOVE`;

// action creators
export const getDepartment = (payload) => ({
    type: GET_DEPARTMENT,
    payload: payload,
    docAction: SET_DEPARTMENT
});

export const listDepartment = (payload) => ({
    type: LIST_DEPARTMENT,
    payload: payload,
    docAction: LOAD_DEPARTMENT
});

export const  createDepartment= (payload) => ({
    type: CREATE_DEPARTMENT,
    payload: payload,
    docAction: SET_DEPARTMENT
});

export const  updateDepartment = (payload) => ({
    type: UPDATE_DEPARTMENT,
    payload: payload,
    docAction: SET_DEPARTMENT
});

export const  deleteDepartment = (payload) => ({
    type: DELETE_DEPARTMENT,
    payload: payload,
    docAction: REMOVE_DEPARTMENT
});


//////////

export const setDepartments = ({departments, normalizeKey}) => ({
    type: LOAD_DEPARTMENT,
    payload: departments,
    meta: {normalizeKey, feature: DEPARTMENT}
});

export const setDepartment = ({department, normalizeKey}) => ({
    type: SET_DEPARTMENT,
    payload: department,
    meta: {normalizeKey, feature: DEPARTMENT}
});

export const removeDepartment = ({department, normalizeKey}) => ({
    type: REMOVE_DEPARTMENT,
    payload: department,
    meta: {normalizeKey, feature: DEPARTMENT}
});