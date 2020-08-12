import { 
    SET_USER, UNSET_USER,
} from '../actions/user.action';

const initialState = {};

export default (user = initialState, action) => {
    switch(action.type){
        case SET_USER:
            return action.payload;
        case UNSET_USER:
            return (user._id == action.payload._id) ? {} : user;
        default:
            return user;
    }
};