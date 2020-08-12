import { SET_USER, REMOVE_USER, LOAD_USER } from '../actions/users.action';

const initialState = [];

export default (users = initialState, action) => {
    switch(action.type){
        case SET_USER:
            return [
                ...users.filter( user => user._id != action.payload._id),
                action.payload
            ];
        case REMOVE_USER:
            return users.filter( user => user._id != action.payload._id);
        case LOAD_USER:
            return action.payload;
        default:
            return users;
    }
};