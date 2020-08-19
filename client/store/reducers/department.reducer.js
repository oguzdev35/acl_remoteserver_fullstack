import { SET_DEPARTMENT, REMOVE_DEPARTMENT, LOAD_DEPARTMENT } from '../actions/department.action';

const initialState = [];

export default (departments = initialState, action) => {
    switch(action.type){
        case SET_DEPARTMENT:
            return [
                ...departments.filter( department => department._id != action.payload._id),
                action.payload
            ];
        case REMOVE_DEPARTMENT:
            return departments.filter( department => department._id != action.payload._id);
        case LOAD_DEPARTMENT:
            return action.payload;
        default:
            return departments;
    }
};