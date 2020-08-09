import { SET_USER } from '../actions/user.action';

const initialState = {};

export default (user = initialState, action) => {
    switch(action.type){
        case SET_USER:
            return action.payload;
        default:
            return user;
    }
};