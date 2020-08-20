import {
    SET_BLOCK, REMOVE_BLOCK,
    LOAD_BLOCK, CLEAR_BLOCK
} from '../actions/block.action';

const initialState = [];

export default (blocks = initialState, action) => {
    switch(action.type){
        case SET_BLOCK:
            return [
                ...blocks.filter( block => block._id != action.payload._id),
                action.payload
            ];
        case REMOVE_BLOCK:
            return blocks.filter( block => block._id != action.payload._id);
        case LOAD_BLOCK:
            return action.payload;
        case CLEAR_BLOCK:
            return [];
        default:
            return blocks;
    }
};