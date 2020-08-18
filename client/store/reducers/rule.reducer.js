import { SET_RULE, REMOVE_RULE, LOAD_RULE } from '../actions/rule.action';

const initialState = [];

export default (rules = initialState, action) => {
    switch(action.type){
        case SET_RULE:
            return [
                ...rules.filter( rule => rule._id != action.payload._id),
                action.payload
            ];
        case REMOVE_RULE:
            return rules.filter( rule => rule._id != action.payload._id);
        case LOAD_RULE:
            return action.payload;
        default:
            return rules;
    }
};