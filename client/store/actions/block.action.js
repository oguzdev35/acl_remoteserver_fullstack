// feature name
export const BLOCK = '[Block]';

// action types$
export const GET_BLOCK = `${BLOCK} GET`;
export const LIST_BLOCK = `${BLOCK} LIST`;
export const CREATE_BLOCK = `${BLOCK} CREATE`;
export const UPDATE_BLOCK = `${BLOCK} UPDATE`;
export const DELETE_BLOCK = `${BLOCK} DELETE`;


export const SET_BLOCK = `${BLOCK} SET`;
export const LOAD_BLOCK = `${BLOCK} LOAD`;
export const REMOVE_BLOCK = `${BLOCK} REMOVE`;

// action creators
export const getBlock = (payload) => ({
    type: GET_BLOCK,
    payload: payload,
    docAction: SET_BLOCK
});


export const listBlock = (payload) => ({
    type: LIST_BLOCK,
    payload: payload,
    docAction: LOAD_BLOCK
});

export const  createBlock= (payload) => ({
    type: CREATE_BLOCK,
    payload: payload,
    docAction: SET_BLOCK
});

export const  updateBlock = (payload) => ({
    type: UPDATE_BLOCK,
    payload: payload,
    docAction: SET_BLOCK
});

export const  deleteBlock = (payload) => ({
    type: DELETE_BLOCK,
    payload: payload,
    docAction: REMOVE_BLOCK
});

//////////

export const setBlocks = ({blocks, normalizeKey}) => ({
    type: LOAD_BLOCK,
    payload: blocks,
    meta: {normalizeKey, feature: BLOCK}
});

export const setBlock = ({block, normalizeKey}) => ({
    type: SET_BLOCK,
    payload: block,
    meta: {normalizeKey, feature: BLOCK}
});

export const removeBlock = ({block, normalizeKey}) => ({
    type: REMOVE_BLOCK,
    payload: block,
    meta: {normalizeKey, feature: BLOCK}
});